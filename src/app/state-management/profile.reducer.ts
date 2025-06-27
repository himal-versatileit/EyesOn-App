import { createReducer, on } from "@ngrx/store";
import { Int_UserProfile } from "./profile.interface";
import { GET_User_Profile, GET_User_Profile_SUCCESS, RESET_User_Profile_SUCCESS } from "./profile.action";

//#region User Profile

const initialUserProfile: Int_UserProfile = {
  Name: "",
  MobileNo: "",
  EmailID: "",
  IsAdmin: "",
  UserName: "",
  UID: "",
  EmpID: "",
  UserInfo: {},
};

export const userProfileReducer = createReducer(
  initialUserProfile,
  on(GET_User_Profile, (state: Int_UserProfile) => state),
  on(GET_User_Profile_SUCCESS, (state: Int_UserProfile, { payload }) => {
    return { ...state, ...payload };
  }),
  on(RESET_User_Profile_SUCCESS, () => {
    return {
      Name: "",
      MobileNo: "",
      EmailID: "",
      IsAdmin: "",
      UserName: "",
      UID: "",
      EmpID: "",
      UserInfo: {},
    };
  })
);

//#endregion
