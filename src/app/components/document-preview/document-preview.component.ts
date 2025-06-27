import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Cls_FileUpload, FileType } from "src/app/models";
import { GlobalService } from "src/app/services";

@Component({
  selector: "app-document-preview",
  templateUrl: "./document-preview.component.html",
  styleUrls: ["./document-preview.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class DocumentPreviewComponent {
  private readonly globalService = inject(GlobalService);

  constructor() {}

  @Input({ required: true }) uploadedDocuments: Cls_FileUpload[] = [];
  @Input() isDeletable: boolean = false;

  @Output() uploadedDocumentsChange = new EventEmitter();

  readonly FILE_TYPE = FileType;

  onDelete(index: number) {
    this.uploadedDocuments.splice(index, 1);
    this.uploadedDocumentsChange.emit(this.uploadedDocuments);
  }

  openDocument(url: string) {
    this.globalService.openSiteInBrowser(url);
  }
}
