import { CommonModule } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController, ViewDidEnter, ViewDidLeave } from "@ionic/angular";
import { ButtonComponent } from "src/app/components/button/button.component";
import { Cls_FileUpload, Cls_FileUploadDialogConfig, FileType } from "src/app/models";
import { GlobalService, ToastrService } from "src/app/services";
import { Camera, CameraResultType } from "@capacitor/camera";
import { Subscription } from "rxjs";

const imageRegex = /\.(png|jpg|jpeg|tiff|icon)$/i;
const pdfRegex = /\.(pdf)$/i;
const excelRegex = /\.(xlsx|xls|csv)$/i;
const videoRegex = /\.(mp4|mov|avi|mkv|flv)$/i;
const audioRegex = /\.(mp3|wav|ogg|flac)$/i;
const docRegex = /\.(doc|docx|DOC|DOCX)$/i;
const textRegex = /\.(txt|TEXT)$/i;

enum FILE_ACCEPTS {
  PDF = "application/pdf",
  IMAGE = "image/*",
}

@Component({
  selector: "app-document-upload",
  templateUrl: "./document-upload.component.html",
  styleUrls: ["./document-upload.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ButtonComponent],
})
export class DocumentUploadComponent implements ViewDidEnter, ViewDidLeave {
  private readonly toastr = inject(ToastrService);
  private readonly globalService = inject(GlobalService);
  private readonly modalCtrl = inject(ModalController);

  constructor() {}

  ionViewDidEnter(): void {
    this.backButtonHandler = this.globalService.backButtonHandler(async () => {
      await this.closeModal();
    });
  }

  @Input() isMultiple: boolean = false;
  @Input() isCamera: boolean = true;
  @Input() isDocument: boolean = true;
  @Input() fileTypes: string = "Image"; // Image, PDF
  @Input() documentSize: number = 2; // Size of the document

  @Output() uploadCompleteEmitter = new EventEmitter();
  private backButtonHandler = new Subscription();

  @ViewChild("fileInput") fileInput!: ElementRef;
  selectedFileType: string = "";

  get fileAccepts() {
    let acceptsValue: string = "";
    this.fileTypes?.split(",").map(el => {
      switch (el?.toUpperCase()) {
        case FileType.IMAGE:
          acceptsValue += `, ${FILE_ACCEPTS.IMAGE}`;
          break;
        case FileType.PDF:
          acceptsValue += `, ${FILE_ACCEPTS.PDF}`;
          break;
      }
    });

    return acceptsValue?.split(",")?.filter(Boolean).join(",");
  }

  private async closeModal() {
    const modal = await this.modalCtrl.getTop();
    if (modal) modal.dismiss();
  }

  onSelectDocument() {
    this.fileInput.nativeElement?.click();
  }

  private validateFile(file: File | null): boolean {
    if (!file) return false;
    let isValid: boolean = true;
    const fileType: string = file?.name || "";
    this.selectedFileType = "";

    if (imageRegex.test(fileType)) {
      this.selectedFileType = FileType.IMAGE;
      isValid = true;
    }

    if (pdfRegex.test(fileType)) {
      this.selectedFileType = FileType.PDF;
      isValid = true;
    }

    if (excelRegex.test(fileType)) {
      this.selectedFileType = FileType.EXCEL;
      isValid = true;
    }

    if (videoRegex.test(fileType)) {
      this.selectedFileType = FileType.VIDEO;
      isValid = true;
    }

    if (audioRegex.test(fileType)) {
      this.selectedFileType = FileType.AUDIO;
      isValid = true;
    }

    if (docRegex.test(fileType)) {
      this.selectedFileType = FileType.DOC;
      isValid = true;
    }

    if (textRegex.test(fileType)) {
      this.selectedFileType = FileType.TEXT;
      isValid = true;
    }

    isValid = !!this.fileTypes?.split(",").find(el => el?.toUpperCase() === this.selectedFileType?.toUpperCase());

    if (!isValid) {
      this.toastr.presentToast("Invalid File Type", "warning");
      this.fileInput.nativeElement.value = "";
      return false;
    }

    if (file.size > this.documentSize * 1024 * 1024) {
      this.toastr.presentToast(`File Size is too large. Max File Size is ${this.documentSize} MB`, "warning");
      this.fileInput.nativeElement.value = "";
      return false;
    }

    return isValid;
  }

  onFileChange(event: any) {
    const files = event.target.files;
    const filesModalPromises: Promise<Cls_FileUpload>[] = [];

    if (files?.length > 1 && !this.isMultiple) {
      this.fileInput.nativeElement.value = "";
      this.toastr.presentToast("Only one file can be selected", "warning");
      return;
    }

    for (let index = 0; index < files.length; index++) {
      const file = files[index];

      if (!this.validateFile(file)) {
        break;
      }

      const fileModalPromise = new Promise<Cls_FileUpload>((resolve, reject) => {
        const tempModal = new Cls_FileUploadDialogConfig();

        tempModal.BlobFileType = file.type;
        tempModal.FileSize = file.size;
        tempModal.FileType = this.selectedFileType;

        const myReader: FileReader = new FileReader();
        myReader.readAsDataURL(file);
        myReader.onloadend = () => {
          const fileBase64 = myReader.result as string;
          const blob = new Blob([file], { type: file.type });
          tempModal.BlobFileData = window.URL.createObjectURL(blob);
          tempModal.FileData = fileBase64;

          const fileModal = new Cls_FileUpload();
          fileModal.FID = 0;
          fileModal.MID = "";
          fileModal.ID = +this.globalService.generateRandomValue(true, false, 10);
          fileModal.FilesName = tempModal?.FileData;
          fileModal.FileType = tempModal.FileType;
          fileModal.BlobFile = tempModal?.BlobFileData;
          fileModal.BlobFileType = tempModal?.BlobFileType;

          resolve(fileModal);
        };
      });

      filesModalPromises.push(fileModalPromise);
    }

    Promise.all(filesModalPromises)
      .then(async filesModal => {
        this.uploadCompleteEmitter.emit(filesModal);
        await this.closeModal();
      })
      .catch(error => {
        console.error("Error processing files:", error);
      });
  }

  //#region Camera

  async onClickCamera() {
    const hasPermission = await Camera.checkPermissions();
    if (!hasPermission) {
      const askPermission = await Camera.requestPermissions({
        permissions: ["camera", "photos"],
      });

      if (askPermission.camera === "denied" || askPermission.photos === "denied") {
        await this.toastr.presentToast("Camera / Photos access denied", "warning");
        return;
      }

      await this.takePhotos();

      return;
    }

    await this.takePhotos();
  }

  async takePhotos() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });

    const fileModal = new Cls_FileUpload();
    fileModal.FID = 0;
    fileModal.MID = "";
    fileModal.ID = +this.globalService.generateRandomValue(true, false, 10);
    fileModal.FilesName = `data:image/${image.format};base64,${image?.base64String}`;
    fileModal.FileType = "IMAGE";
    fileModal.BlobFile = "";
    fileModal.BlobFileType = `image/${image.format}`;
    this.uploadCompleteEmitter.emit([fileModal]);
    await this.closeModal();
  }

  //#endregion

  ionViewDidLeave(): void {
    if (this.backButtonHandler) this.backButtonHandler.unsubscribe();
  }
}
