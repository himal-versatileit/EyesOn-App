export class Cls_ServiceRequest {
  SRID?: number;
  SRName?: string;
  gSRName?: string;
  hSRName?: string;
  gSRRemarks?: string;
  hSRRemarks?: string;
  SRAmount?: number;
  SRDuration?: number;
  SRRemarks?: string;
  IsActive?: boolean;
  CreatedBy?: number;
  CreatedByName?: string;
  CreatedDate?: string;
  UpdatedBy?: any;
  UpdatedByName?: any;
  UpdatedDate?: any;
  Assignee?: string;
  AssigneeIDs?: string;
  TotalSRReceived?: number;
  TotalSRCompleted?: number;
  SRAdmin?: number;
  SRAdminName?: string;
  SRPriority?: number;
  IsECCTappingRequired?: boolean;
  IsECCQRRequired?: boolean;
  IsFeedBackRequired?: boolean;
  IsOtpRequired?: boolean;
}

export class Cls_ServiceRequestPayload {
  MobileNo?: number;
  ServiceRequestPaymentDocuments?: any[];
  RequestTime?: string;
  ServiceRequestDate?: string;
  ServiceRequestCompDate?: string;
  SRID?: number;
  Amount?: number;
  Name?: string;
  EMailID?: string;
  EasyCityCode?: string;
  Address?: string;
  Remarks?: string;
}

export class Cls_NearByPlaceCategory {
  PCID?: number;
  Name?: string;
  Description?: any;
  Icon?: string;
  IsActive?: boolean;
}

export class Cls_PlaceByCategory {
  PlaceID?: number;
  PCID?: number;
  Name?: string;
  Description?: string;
  Address?: string;
  City?: string;
  Latitude?: string;
  Longitude?: string;
  PhoneNo?: string;
  Website?: string;
  DocFileName?: string;
  Document?: string;
  IsThumbnail?: boolean;
  IsActive?: boolean;
}

export class Cls_PlaceDocuments {
  ImageID?: number;
  PlaceID?: number;
  DocFileName?: string;
  DocExt?: string;
  DocContentType?: string;
  IsThumbnail?: boolean;
  IsActive?: boolean;
}

export class Cls_PlaceSchedule {
  BHID?: number;
  PlaceID?: number;
  Day?: string;
  OpenTime?: string;
  CloseTime?: string;
  IsActive?: boolean;
}

export class Cls_PaymentForAll {
  PFID?: number;
  PaymentForName?: string;
  PaymentForRemarks?: string;
  IsActive?: boolean;
  IsAcceptAdvanceAmount?: boolean;
  IsPartialPaymentAllowed?: boolean;
  ModuleID?: number;
  IsArrearsVisible?: boolean;
  IsNoticeGenerated?: boolean;
  IsInterestApplied?: boolean;
  InterestFirstSlotDays?: number;
  InterestFirstSlotPercentage?: number;
  InterestSecondSlotDays?: number;
  InterestSecondSlotPercentage?: number;
  IsDiscountApplied?: boolean;
  DiscountValidDays?: boolean;
  DiscountPercentage?: boolean;
  SGST_Per?: boolean;
  CGST_Per?: boolean;
  PaymentForTypeMaster?: number;
}
