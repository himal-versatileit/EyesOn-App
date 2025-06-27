import { createAction, props } from "@ngrx/store";
import { Int_UserProfile } from "./profile.interface";

//#region User Profile

export const GET_User_Profile = createAction("[GET_User_Profile] GET All user profile", props<{ isReload: boolean }>());
export const GET_User_Profile_SUCCESS = createAction("[GET_User_Profile_SUCCESS] GOT All user profile", props<{ payload: Int_UserProfile }>());
export const RESET_User_Profile_SUCCESS = createAction("[RESET_User_Profile_SUCCESS] RESET All user profile");

//#endregion
