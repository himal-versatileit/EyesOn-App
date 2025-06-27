export class Cls_DatePickerProps {
  title?: string;
  selectedDate?: string | null;
  minDate?: string | null;
  maxDate?: string | null;
}

export class Cls_PickerItem {
  label?: string;
  value?: string | number | null | undefined;
  isFound?: boolean;
}

export class Cls_PickerSheerProps {
  title?: string;
  selectedValue!: Cls_PickerItem;
  list?: Cls_PickerItem[];
  isSearchable?: boolean = false;
}

export class Cls_FileUploadDialogConfig {
  FileType = "IMAGE";
  FileSize = 2;
  FileData = ""; // Virtual
  BlobFileType = ""; // Virtual
  BlobFileData = ""; // Virtual
}

export enum FileType {
  IMAGE = "IMAGE",
  PDF = "PDF",
  EXCEL = "EXCEL",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  DOC = "DOC",
  TEXT = "TEXT",
}

export class Cls_FileUpload {
  FID!: number;
  MID!: string;
  ID!: number;
  FilesName!: string;
  DocFileName?: string;
  FileType!: string;
  BlobFile = "";
  BlobFileType = "";

  // Other
  Status!: string;
}

export class Cls_FileUploadNew {
  FID!: number;
  MID!: string;
  ID!: number;
  FilesName!: string;
  FileType!: string;
  BlobFile = "";
  BlobFileType = "";

  // Other
  Status!: string;
}
