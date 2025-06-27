import { userProfileReducer } from "./profile.reducer";

export interface ProfileState {
  USER_PROFILE: Int_UserProfile;
}

export const ProfileReducer = {
  USER_PROFILE: userProfileReducer,
};

export interface Int_UserProfile {
  Name: string;
  MobileNo: string;
  EmailID: string;
  IsAdmin: string;
  UID: string;
  EmpID: string;
  UserName: string;
  UserInfo: Int_UserInfo;
}

export interface Int_UserInfo {
  IsMasterUser?: boolean;
  UserRole?: string;
  IsTaskAdmin?: boolean;
  RID?: number;
  UserID?: string;
  Pwd?: any;
  UserName?: string;
  UMobileno?: number;
  UEmailID?: string;
  EmpID?: number;
  UserTypeID?: number;
  UserTypeName?: string;
  EmployeeName?: any;
  DesignationID?: number;
  Designation?: any;
  isAdmin?: boolean;
  IsAPIUser?: boolean;
  IsActive?: boolean;
  CDate?: string;
  IsGOfficer?: boolean;
  isSuperAdmin?: boolean;
  REmployeeID?: string;
  RName?: string;
  RDesignation?: string;
  RMobile?: string;
  REmailID?: string;
  FirebaseToken?: string;
  FirebaseToken_App?: string;
  MenuPermission?: any;
  UserMobilePagePermission?: any;
  IsTOfficer?: boolean;
}
