import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { GOOGLE_MAP_API_KEY } from "../models";

@Injectable({
  providedIn: "root",
})
export class MasterService {
  constructor(
    private httpClient: HttpClient,
    private httpBackend: HttpBackend
  ) {
    this.API_URL = environment.API_URL;
    this.avoidInterceptorHttpClient = new HttpClient(httpBackend);
  }

  private API_URL: string = "";
  avoidInterceptorHttpClient!: HttpClient;

  //#region GET

  getDashboardCarousel() {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/GetMobileAppDashboardCarousel`);
  }

  GetTermsAndCondition() {
    return this.httpClient.get(`${this.API_URL}/api/CitizenMobileAppAPI/GetTermsAndCondition`);
  }

  GetImportantLinks() {
    return this.httpClient.get(`${this.API_URL}/api/CitizenMobileAppAPI/GetImportantLinks`);
  }

  GetSupport() {
    return this.httpClient.get(`${this.API_URL}/api/CitizenMobileAppAPI/GetSupport`);
  }

  GetSchemeImplemented() {
    return this.httpClient.get(`${this.API_URL}/api/CitizenMobileAppAPI/GetSchemeImplemented`);
  }

  // GetNearbyPlaceCategory() {
  //   return this.httpClient.get(`${this.API_URL}/api/MobileAPI/GetNearbyPlaceCategory`);
  // }

  // GetNearByPlaceByPCID(PCID: number) {
  //   return this.httpClient.get(`${this.API_URL}/api/MobileAPI/GetNearByPlaceByPCID?PCID=${PCID}`);
  // }

  // GetNearByPlaceDetailsByPlaceID(PlaceID: number) {
  //   return this.httpClient.get(`${this.API_URL}/api/MobileAPI/GetNearByPlaceDetailsByPlaceID?PlaceID=${PlaceID}`);
  // }

  GetSchemeBySchemeName() {
    return this.httpClient.get(`${this.API_URL}/api/CitizenMobileAppAPI/GetSchemeBySchemeName`);
  }

  GetSurveyResponseExcel(SID: number) {
    return this.httpClient.get(`${this.API_URL}/api/Survey/GetSurveyResponseExcel?SID=${SID}`);
  }

  GetSurveyList_Mobile(MobileNo: number) {
    return this.httpClient.get(`${this.API_URL}/api/Survey/GetSurveyList_Mobile?MobileNo=${MobileNo}&PageNumber=${1}&PageSize=${100}`);
  }

  GetServiceRequestMaster(SRID: number, IsAll: boolean) {
    return this.httpClient.get(`${this.API_URL}/api/ServiceRequest/GetServiceRequestMaster?SRID=${SRID}&IsAll=${IsAll}`);
  }

  GetServiceRequestPayment() {
    return this.httpClient.get(`${this.API_URL}/api/ServiceRequest/GetServiceRequestPayment`);
  }

  GetDashboard(userID: number, RType: number = 1) {
    return this.httpClient.get(`${this.API_URL}/api/Complain/GetDashboard?UserId=${userID}&RType=${RType}`);
  }

  GetOfficerAppDashboard(USERID: number) {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/GetOfficerAppDashboard?USERID=${USERID}`);
  }

  SentOtp(mobileNo: string, emailID: string, message: string, STypes: string = "OTP", tempID: string = "1207165812885595997") {
    return this.httpClient.get(`${this.API_URL}/api/Utilities/SendOTP?MobileNo=${mobileNo}&EMail=${emailID}&Message=${message}&STypes=${STypes}&TempID=${tempID}`);
  }

  GetCitizenMobileVerify(Search: string) {
    // MobileNo or EmailID
    return this.httpClient.get(`${this.API_URL}/api/User/GetCitizenMobileVerify?Search=${Search}`);
  }

  GetCitizenInfoByMobileNo(Search: string) {
    // MobileNo or EmailID
    return this.httpClient.get(`${this.API_URL}/api/User/GetCitizenInfoMasterByMobileNo?Search=${Search}`);
  }

  GetPaymentGatewayURL(ConsumerNo: string, Amount: number, ReturnURL: string = "", PaymentFor: number) {
    return this.httpClient.get(`${this.API_URL}/api/Account/GetPaymentGatewayURL?ConsumerNo=${ConsumerNo}&Amount=${Amount}&ReturnURL=${ReturnURL}&PaymentFor=${PaymentFor}`);
  }

  // GetTaskDetailsByQuery(Query: string, Sort: string) {
  //   return this.httpClient.get(`${this.API_URL}/api/TaskManager/GetTaskDetailsByQuery?Where=${Query}&Sorting=${Sort}`);
  // }

  getAddressFromCoordinates(latitude: number, longitude: number): Promise<string> {
    const apiKey = GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    return new Promise<string>((resolve, reject) => {
      this.httpClient.get(url).subscribe(
        (response: any) => {
          if (response.status === "OK" && response.results[0]) {
            resolve(response.results[0].formatted_address);
          } else {
            reject("Unable to geocode coordinates");
          }
        },
        error => {
          reject("Error retrieving address");
        }
      );
    });
  }

  PaymentForAll(IsAll: boolean) {
    return this.httpClient.get(`${this.API_URL}/api/Masters/PaymentForAll?IsAll=${IsAll}`);
  }

  GetAccountLedger(MasterID: string) {
    return this.httpClient.get(`${this.API_URL}/api/Account/GetAccountLedger?MasterID=${MasterID}`); // 1000022160
  }

  GetPaymentThroughMaster(PTID: number, IsAll: boolean) {
    return this.httpClient.get(`${this.API_URL}/api/Masters/GetPaymentThroughMaster?PTID=${PTID}&IsAll=${IsAll}`); // 1000022160
  }

  //#endregion

  //#region POST

  //#endregion

  //#region PUT

  //#endregion

  //#region DELETE

  //#endregion
}
