export class Cls_Complaint {
  ComplainNo!: number;
  CFirstName!: string;
  CMiddleName!: string;
  CLastName!: string;
  CompanyName!: string;
  Phone!: string;
  Email!: string;
  isEmailNotify!: string;
  SourceID!: number;
  CategoryID!: number;
  CategoryName!: string; // Virtual
  SubCategoryID!: number;
  SubCategoryName!: string; // Virtual
  WardID!: number;
  EasyCityCode!: string;
  LocalityID!: number;
  LocalityName!: string; // Virtual
  SubLocalityID!: string;
  Location!: string;
  CDescription!: string;
  LAT!: number;
  LNG!: number;
  EntryThrough!: number; //--2 default
  CustChooseLng!: string;
  ComplainDocsMaster!: Cls_ComplaintDocsList[];
}

export interface Int_ComplaintMain {
  SrNo: number;
  RID: number;
  ComplainNo: string;
  CDate: string; // ISO date format
  SourceID: number;
  SourceName: string;
  CategoryID: number;
  CategoryName: string;
  gCategoryName: string; // Gujarati category name
  hCategoryName: string; // Hindi category name
  SubCategoryID: number;
  SubCategoryName: string;
  GSubCategoryName: string; // Gujarati sub-category name
  HSubCategoryName: string; // Hindi sub-category name
  WardID: number;
  WName: string;
  ZoneID: number;
  ZName: string;
  Location: string;
  CDescription: string;
  ComplainerName: string;
  CompanyName?: string; // Optional, as it's empty in the data
  cAddress?: string | null;
  Area?: string | null;
  Phone: string;
  Email: string;
  isEmailNotify: string;
  StatusID: number;
  StatusName: string;
  StatusDescription: string;
  gStatusDescription: string; // Gujarati status description
  hStatusDescription: string; // Hindi status description
  CUserID: number;
  EmpID: number;
  EmpName: string;
  EmpDepartment: string;
  Designation: string;
  Mobile: string;
  cIMAGE: string;
  Duration1: number;
  OVERLIMIT: string;
  cDuration: number;
  cOverLimitDuration: number;
  cSolvedDuration: number;
  DueDate: string; // ISO date format
  LAT: string;
  LNG: string;
  EasyCityCode?: string;
  EntryThrough: string;
  CopyTo?: string;
  InwardNo?: string;
  IsNewMessage: number;
  cPicture?: string;
  IscPicture: boolean;
  ScanDoc?: string;
  IsScanDoc: boolean;
  CustFeedBack: number;
  CustFeedBackNote?: string | null;
  CustFeedBackDateTime?: string | null; // ISO date format
  SolvedDate: string; // ISO date format
  SolvedImage: string;
  IsSolvedPicture: boolean;
  SolvedDuration: string;
  EmpFirebaseToken?: string;
  CustChooseLng: string;
  ColorSchema: string;
  cLocalityID: number;
  LocalityName: string;
  gLocalityName: string;
  hLocalityName: string;
  SuccessMsg: string;
  gSuccessMsg: string;
  hSuccessMsg: string;
  EscalationLevel: number;
  CFirstName: string;
  Address1?: string | null;
  IsNotify: string;
  CStatus: number;
  EmpDesignation: string;
  EmpMobile: string;
  Duration: string; // ISO date format
  isFound: boolean;
}

export interface Int_StatusCount {
  RID: number;
  SNAME: string;
  cCount: number;
}

export interface Int_ComplaintStatus {
  RID: number;
  CDescription: string;
  CStatus: number;
  ToUserID: number;
  CUserID: number;
  HostID: string;
}

export interface Int_ComplaintTransfer {
  RID: number;
  CDescription: string;
  CStatus: number;
  ToUserID: number;
  CUserID: number;
  HostID: string;
}

export interface Int_ComplaintRemarks {
  MID: number;
  RID: number;
  ByEmployeeID: number;
  Remarks: string;
  ComplaintRemakDocs: any;
}

export interface Int_GOfficer {
  IsGOfficer: boolean;
  FirebaseToken: string;
  RID: number;
  EmployeeID: string;
  Name: string;
  gName: string;
  hName: string;
  DesignationID: number;
  Designation: string;
  Mobile: string;
  EmailID: string;
  MsgContacts: any;
  ReportEmpID: number;
  UserID: string;
  Pwd: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isActive: boolean;
  UserTypeID: number;
  UserTypeName: string;
  REmployeeID: string;
  RName: string;
  RDesignation: string;
  RMobile: string;
  REmailID: string;
  UserCategory: any;
  UserSubcategory: any;
  UCategory: any;
  USubCategory: any;
  EmployeeCategories: any;
}

export class Cls_ComplaintDocsList {
  ComplainID!: number;
  DocTypeID!: number;
  DocNumber!: string;
  DocFileName!: string;
  DocExt!: string;
  DocContType!: string;
  DocImage!: string;
}

export class Cls_ComplainRemarkDoc {
  DocFileName!: String;
  DocExt!: String;
  DocContType!: String;
  DocImage!: String;
  CreatedBy!: number;
}
export class Cls_ComplintsRemarksApp {
  RID!: number;
  MID!: number;
  Remarks!: String;
  eDate!: Date;
  ByEmployeeID!: number;
  ByEmployeeName!: String;
  cSource!: String;
  cLAT!: number;
  cLONG!: number;
  ComplainRemarkDoc!: Cls_ComplainRemarkDoc[];
}
