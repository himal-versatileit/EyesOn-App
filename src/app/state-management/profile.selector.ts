import { createSelector, createFeatureSelector } from "@ngrx/store";
import { ProfileState } from "./profile.interface";

const profileSelector = createFeatureSelector<ProfileState>("PROFILE");

export const selectUserProfile = createSelector(profileSelector, (state: ProfileState) => state.USER_PROFILE);
