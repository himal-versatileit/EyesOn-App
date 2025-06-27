export interface Int_PropertyMain {
  PropertyID: number;
  MunicipalRegistrationNumber: string;
  RegistrationNumber: number;
  ConsumerNumber: number;
  DataReceivedFrom: number;
  DataReceivedFromName: string;
  PropertyStatusName: string;
  PropertyStatusID: number;
  OldPropertyID: string;
  ParentPropertyID: any;
  REASYCITYCODE: string;
  EASYCITYCODE: any;
  PREEASYCITYCODE: any;
  EASYCITYCODE_CITY: string;
  EASYCITYCODE_LOCALITY: any;
  EASYCITYCODE_BUILDING: any;
  EASYCITYCODE_BUILDING_SUFFIX: any;
  EASYCITYCODE_PROPERTY: any;
  OwnerList: string;
  OwnerID: number;
  OwnerName: string;
  AppliedByName: any;
  AppliedAadharNo: any;
  PrimaryMobileNo: any;
  SecondaryMobileNo: any;
  PrimaryEmailID: any;
  SecondaryEmailID: any;
  PropertyAddress: string;
  LocalityID: any;
  LocalityName: any;
  SubLocalityID: any;
  WardID: number;
  WName: string;
  ZoneID: number;
  ZName: string;
  Latitude: any;
  Longitude: any;
  PropertyTypeID: number;
  PropertyTypeName: string;
  PropertySubTypeID: number;
  PropertySubTypeName: string;
  PropertyAge: number;
  PropertyAgeID: any;
  PropertyAgeName: any;
  ClassID: any;
  ClassName: any;
  ClassDetailsID: any;
  AreaName: any;
  OccupancyID: number;
  OccupancyName: string;
  PropertyRegistrationDate: string;
  NoOfFloor: number;
  ConstructionYear: number;
  Total_Plot_Area_in_Feet: number;
  Carpet_Area_in_Feet: number;
  BuildUp_Area_in_Feet: number;
  RegistrationFee: number;
  IsRegistrationFeePaid: boolean;
  RegistrationFeePaidDate: string;
  RegistrationFeeTransactionNo: number;
  RegistrationFeeAGCodeLedger: string;
  IsTenant: boolean;
  IsTenantCompany: boolean;
  TenantName: any;
  TenantMobileNo: any;
  IsUpdated: boolean;
  CertificateNo: any;
  IsCertificateGenerate: boolean;
  CertificateGenerateDate: any;
  RejectedBy: any;
  RejectedByName: any;
  RejectedByMobile: any;
  RejectedByEMail: any;
  RejectedRemarks: any;
  RejectedDate: any;
  Remarks: string;
  IsActive: boolean;
  Barcode: any;
  TAGUID: any;
  FloorList: string;
  IsApprovalByUser: boolean;
  LastApprovalUser: number;
  LastApprovalSOPLevel: number;
  CurrentLevel: number;
  MaxSOPStep: number;
  LastApprovalDatetime: string;
  ApprovalDatetime: string;
  LastApprovalUserName: string;
  LastApprovalMobileNo: number;
  LastApprovalEMailID: string;
  LastApprovalRemarks: string;
  NextApprovalUser: string;
  IsSubmitted: boolean;
  SubmittedDate: string;
  PropertyStatus: number;
  MostRecentDate: string;
  CreatedBy: number;
  CreatedDate: any;
  Total_PropertyTax: number;
  BaseRate: number;
  TotalAmount: number;
}

export class Cls_AddPropertyLatLong {
  PropertyID?: number;
  Latitude?: string;
  Longitude?: string;
  UserID?: number;
}

export class AddPropertyNewEditMainSave {
  EditPID?: number;
  IsSubmitted?: boolean;
  SubmittedDate?: Date;
  EditAppliedDate?: Date;
  PropertyID?: number;
  AppliedByName?: string;
  AppliedContactNumber?: string;
  AppliedContactEMail?: string;
  AppliedAadharNo?: number;
  RegistrationFee?: number;
  IsRegistrationFeePaid?: boolean;
  RegistrationFeePaidDate?: Date;
  RegistrationFeeTransactionNo?: number;
  RegistrationFeeAGCodeLedger?: string;
  EditApplicationStatus?: number;
  IsApprovalByUser?: boolean;
  ApprovalUser?: number;
  ApprovalSOPLevel?: number;
  ApprovalDatetime?: Date;
  RejectedBy?: number;
  RejectedRemarks?: string;
  RejectedDate?: Date;
  Remarks?: string;
  IsActive?: boolean;
  EditTypeID?: number;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class Cls_PropertyNewEditFloorDetails {
  EditPNFID?: number;
  PNFID?: number;
  EditPID?: number;
  PropertyID?: number;
  FloorTypeID?: number;
  Carpet_Area_in_Feet?: number;
  BuildUp_Area_in_Feet?: number;
  PropertyRegistrationDate?: Date;
  PropertyTypeID?: number;
  PropertySubTypeID?: number;
  OccupancyID?: number;
  PropertyAge?: number;
  ConstructionYear?: number;
  IsTenant?: boolean;
  IsTenantCompany?: boolean;
  TenantName?: string;
  TenantMobileNo?: string;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
  EditSubTypeID?: number;
}

export class Cls_PropertyNewEditMain {
  EditPID?: number;
  IsSubmitted?: boolean;
  SubmittedDate?: Date;
  EditAppliedDate?: Date;
  PropertyID?: number;
  AppliedByName?: string;
  AppliedContactNumber?: string;
  AppliedContactEMail?: string;
  AppliedAadharNo?: number;
  RegistrationFee?: number;
  IsRegistrationFeePaid?: boolean;
  RegistrationFeePaidDate?: Date;
  RegistrationFeeTransactionNo?: number;
  RegistrationFeeAGCodeLedger?: string;
  EditApplicationStatus?: number;
  IsApprovalByUser?: boolean;
  ApprovalUser?: number;
  ApprovalSOPLevel?: number;
  ApprovalDatetime?: Date;
  RejectedBy?: number;
  RejectedRemarks?: string;
  RejectedDate?: Date;
  Remarks?: string;
  IsActive?: boolean;
  EditTypeID?: number;
  CreatedBy?: number;
  CreatedDate?: Date;
  UpdatedBy?: number;
  UpdatedDate?: Date;
}

export class Cls_AddPropertyDetailsByHouseNo {
  MobileNo?: string;
  HouseNo?: string;
  CreatedBy?: number;
  IsActive?: number;
}

export interface Int_PropertyReassessmentList {
  EditPID: number;
  PropertyID: number;
  EditApplicationStatusName: string;
  OldPropertyID: string;
  LocalityName: string;
  PropertyAddress: string;
  EditAppliedDate: string;
  SubmittedDate: string;
  IsActive: boolean;
  IsSubmitted: boolean;
  MostRecentDate: string;
}

export interface Int_PropertyReassessmentDetails {
  EditPID: number;
  PropertyID: number;
  OldPropertyID: string;
  SubmittedDate: string;
  EditApplicationStatusName: string;
  EditTypeName: string;
  PropertyNewTypeName: string;
}

export interface Int_PropertyReassessmentDocumentDetails {
  PNDLID: number;
  PropertyID: number;
  DocTypeName: string;
  DocNumber: number;
  DocFileName: string;
  DocExt: string;
  DocContType: string;
  IsActive: boolean;
}

export interface Int_PropertyReassessmentFloorDetails {
  EditPID: number;
  PropertyID: number;
  FloorTypeID: number;
  FloorTypeName: string;
  FloorTypeShortName: string;
  OccupancyName: string;
  BuildUp_Area_in_Feet: number;
  BuildUp_Area_in_Meter: number;
}

export interface Int_PropertyReassessmentOwnerDetails {
  OwnerID: number;
  PropertyID: number;
  OwnerName: string;
  IsOwnerCompany: boolean;
  DOB: string;
  Gender: string;
  ContactName: string;
  ContactNumber: string;
  OwnerPhoto: string;
  IsActive: boolean;
}

export interface Int_PropertyReassessmentMain {
  EditPID: number;
  IsSubmitted: boolean;
  SubmittedDate: string;
  ConsumerNumber: number;
  MunicipalRegistrationNumber: string;
  EditApplicationStatusName: string;
  EditApplicationStatusID: number;
  EditTypeID: number;
  EditTypeName: string;
  PropertyID: number;
  EditAppliedDate: string;
  AppliedByName: string;
  AppliedContactNumber: string;
  AppliedContactEMail: string;
  AppliedAadharNo: number;
  RegistrationFee: number;
  IsRegistrationFeePaid: boolean;
  RegistrationFeePaidDate: string;
  RegistrationFeeTransactionNo: number;
  RegistrationFeeAGCodeLedger: string;
  RegistrationFeePaidTransactionNo: string;
  RegistrationFeePaidAGCodeLedger: string;
  OwnerList: string;
  OwnerID: number;
  OwnerName: string;
  OldOwnerList: string;
  EditApplicationStatus: boolean;
  EASYCITYCODE: string;
  PropertyAddress: string;
  LocalityName: string;
  WName: string;
  RejectedBy: number;
  RejectedByName: string;
  RejectedByMobile: string;
  RejectedByEMail: string;
  RejectedRemarks: string;
  RejectedDate: string;
  Remarks: string;
  IsActive: boolean;
  IsApprovalByUser: boolean;
  LastApprovalUser: number;
  LastApprovalSOPLevel: number;
  CurrentLevel: number;
  MaxSOPStep: number;
  LastApprovalDatetime: string;
  ApprovalDatetime: string;
  LastApprovalUserName: string;
  LastApprovalMobileNo: string;
  LastApprovalEMailID: string;
  LastApprovalRemarks: string;
  NextApprovalUser: string;
  MostRecentDate: string;
  OldPropertyID: string;
}
