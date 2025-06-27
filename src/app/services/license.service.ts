import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Int_SVAccountLedgerMobile } from "../models";

@Injectable({
  providedIn: "root",
})
export class LicenseService {
  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  private API_URL: string = "";

  //#region GET

  CheckLicenseDetails(licenseNumber: string) {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/CheckLicenceDetails?LicenceNo=${licenseNumber}`);
  }

  // CheckLicenceDocs(licenseNumber: string) {
  //   return this.httpClient.get(`${this.API_URL}/api/MobileAPI/CheckLicenceDocs?LicenceNo=${licenseNumber}`);
  // }

  CheckLicenceHistory(licenseNumber: string) {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/CheckLicenceHistory?LicenceNo=${licenseNumber}`);
  }

  CheckLicense(PaymentForID: number, SearchParam: string) {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/CheckLicense?PaymentForID=${PaymentForID}&SearchParam=${SearchParam}`);
  }

  CheckLicenceDocs(PaymentForID: number, ApplicationNo: number) {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/CheckLicenseDocs?PaymentForID=${PaymentForID}&ApplicationNo=${ApplicationNo}`);
  }

  CheckLicensePaymentHistory(PaymentForID: number, ApplicationNo: number) {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/CheckLicensePaymentHistory?PaymentForID=${PaymentForID}&ApplicationNo=${ApplicationNo}`);
  }
  //#endregion

  //#region POST
  AddSVAccountLedger(data: Int_SVAccountLedgerMobile) {
    return this.httpClient.post(`${this.API_URL}/api/MobileAPI/AddSVAccountLedger`, data);
  }
  //#endregion

  //#region PUT

  //#endregion

  //#region DELETE

  //#endregion
}
