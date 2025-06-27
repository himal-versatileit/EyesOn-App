import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AddPropertyNewEditMainSave, Cls_AddPropertyDetailsByHouseNo, Cls_AddPropertyLatLong, Cls_PropertyNewEditFloorDetails, Cls_PropertyNewEditMain, Int_PropertyMain } from "../models";

@Injectable({
  providedIn: "root",
})
export class PropertyService {
  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  private API_URL: string = "";

  //#region GET

  GetLocationByPropertyID(ID: string) {
    return this.httpClient.get(`${this.API_URL}/api/Property/GetLocationbyPropertyID?ID=${ID}`);
  }

  GetPropertyListByDMCNoOrOldPropertyID(propertyId: string) {
    return this.httpClient.get(`${this.API_URL}/api/Property/GetPropertyListByDMCNoOrOldPropertyID?SearchParameter=${propertyId}`);
  }

  GetPropertyListByMobileNo(mobileNo: string) {
    return this.httpClient.get(`${this.API_URL}/api/Property/GetPropertyListByMobileNo?MobileNo=${mobileNo}`);
  }

  GetPropertyTransactionDetailsByMobile(mobileNo: string) {
    return this.httpClient.get(`${this.API_URL}/api/CitizenMobileAppAPI/GetPropertyTransactionDetailsByMobile?MobileNo=${mobileNo}`);
  }

  GetPropertyReassessmentList(IsSubmittedList: boolean, PageNumber: number, PageSize: number, ApplicationStatus: any) {
    return this.httpClient.get(
      `${this.API_URL}/api/MobileAPI/GetPropertyNewEditMainListApp?IsSubmittedList=${IsSubmittedList}&PageNumber=${PageNumber}&PageSize=${PageSize}&Status=${ApplicationStatus}`
    );
  }

  GetPropertyReassessmentDetailsByPID(EditPID: number) {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/GetPropertyNewMainDetailsByID?PropertyID=${EditPID}`);
  }

  GetPropertyNewMainDocumentListByID(EditPID: number) {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/GetPropertyNewDocumentListByID?PropertyID=${EditPID}`);
  }

  GetPropertyNewFloorDetailsByID(EditPID: number) {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/GetPropertyNewFloorDetailsByID?PropertyID=${EditPID}`);
  }

  GetPropertyNewOwnerDetailsByID(PropertyID: number) {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/GetPropertyNewOwnerDetailsByID?PropertyID=${PropertyID}`);
  }

  GetPropertyNewTypeMaster(IsAll: boolean) {
    return this.httpClient.get(`${this.API_URL}/api/Property/GetPropertyNewTypeMaster?IsAll=${IsAll}`);
  }

  GetPropertyNewSubTypeMaster(IsAll: boolean, PropertyTypeID: number) {
    return this.httpClient.get(`${this.API_URL}/api/Property/GetPropertyNewSubTypeMaster?IsAll=${IsAll}&PropertyTypeID=${PropertyTypeID}`);
  }

  GetPropertyNewMainbyConsumerNumber(ConsumerNumber: string) {
    return this.httpClient.get(`${this.API_URL}/api/Property/GetPropertyNewMainbyConsumerNumber?ConsumerNumber=${ConsumerNumber}`);
  }

  GetPropertyNewEditMainbyEditPID(EditPID: number) {
    return this.httpClient.get(`${this.API_URL}/api/Property/GetPropertyNewEditMainbyEditPID?EditPID=${EditPID}`);
  }

  GetPropertyNewMainbyPropertyID(PropertyID: number) {
    return this.httpClient.get(`${this.API_URL}/api/Property/GetPropertyNewMainbyPropertyID?PropertyID=${PropertyID}`);
  }

  GetPropertyByLatLong(Lat: string, Long: string) {
    return this.httpClient.get(`${this.API_URL}/api/Masters/GetPropertyByLatLong?Latitude=${Lat}&Longitude=${Long}`);
  }

  //#endregion

  //#region POST

  AddPropertyDetailsByHouseNo(data: Cls_AddPropertyDetailsByHouseNo) {
    return this.httpClient.post(`${this.API_URL}/api/Property/AddPropertyDetailsByHouseNo`, data);
  }

  AddPropertyLatLong(data: Cls_AddPropertyLatLong) {
    return this.httpClient.post(`${this.API_URL}/api/MobileAPI/AddPropertyLatLong`, data);
  }

  AddPropertyNewEditMainSave(data: AddPropertyNewEditMainSave) {
    return this.httpClient.post(`${this.API_URL}/api/Property/AddPropertyNewEditMainSave`, data);
  }

  AddPropertyNewWditSubmitted(data: Cls_PropertyNewEditMain) {
    return this.httpClient.post(`${this.API_URL}/api/Property/AddPropertyNewEditMainSubmitted`, data);
  }

  AddPropertyNewEditFloorDetails(data: Cls_PropertyNewEditFloorDetails[]) {
    return this.httpClient.post(`${this.API_URL}/api/Property/AddPropertyNewEditFloorDetails`, data);
  }

  //#endregion

  //#region PUT

  //#endregion

  //#region DELETE

  //#endregion
}
