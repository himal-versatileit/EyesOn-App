import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Cls_Complaint, Int_ComplaintRemarks, Int_ComplaintStatus, Int_ComplaintTransfer } from "../models";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ComplaintService {
  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  private API_URL: string = "";

  //#region POST

  InsertComplaint(data: Cls_Complaint) {
    return this.httpClient.post(`${this.API_URL}/api/Complain/AddComplainNew`, data);
  }

  InsertComplaintFeedback(data: Cls_Complaint) {
    return this.httpClient.post(`${this.API_URL}/api/Complain/AddComplainFeedBack`, data);
  }

  AddComplainStatus(data: Int_ComplaintStatus) {
    return this.httpClient.post(`${this.API_URL}/api/Complain/AddComplainStatus`, data);
  }

  AddComplainRemarks(data: Int_ComplaintRemarks) {
    return this.httpClient.post(`${this.API_URL}/api/Complain/AddComplainRemarks`, data);
  }

  AddComplainRemarkApp(data: Int_ComplaintRemarks) {
    return this.httpClient.post(`${this.API_URL}/api/MobileApi/AddComplainRemarkApp`, data);
  }

  GetComplainRemarkDocByComplainNo(ComplainID: number) {
    return this.httpClient.get(`${this.API_URL}/api/MobileApi/GetComplainRemarkDocByComplaintID?ComplainID=${ComplainID}`);
  }

  AddComplainTransfer(data: Int_ComplaintTransfer) {
    return this.httpClient.post(`${this.API_URL}/api/Complain/AddComplainTransfer`, data);
  }

  //#endregion

  //#region PUT

  //#endregion

  //#region GET

  GetCitizenComplainList(Search: string) {
    // MobileNo or EmailID
    return this.httpClient.get(`${this.API_URL}/api/CitizenMobileAppAPI/GetCitizenComplainList?Search=${Search}`);
  }

  GetCategories() {
    return this.httpClient.get(`${this.API_URL}/api/Category/GetCategorys`);
  }

  GetSubCategoriesByCategoryID(categoryID: number) {
    return this.httpClient.get(`${this.API_URL}/api/Category/GetSubCategorybyCategory?CategoryID=${categoryID}`);
  }

  GetComplainByID(ID: number) {
    return this.httpClient.get(`${this.API_URL}/api/Complain/GetComplainByID?Id=${ID}`);
  }

  GetLocality() {
    return this.httpClient.get(`${this.API_URL}/api/Locality/GetLocality`);
  }

  getEmployeesGOfficer() {
    return this.httpClient.get(`${this.API_URL}/api/Complain/getEmployeesGOfficer`);
  }

  getUserComplaints(UserID: string, CMyComplaint: number, cStatus: string = "", Where: string = "", Sorting: string = "", CType: string = "") {
    const params = new HttpParams().set("UserID", UserID).set("Where", Where).set("Sorting", Sorting).set("cStatus", cStatus).set("CType", CType).set("CMyComplaint", CMyComplaint.toString());

    return this.httpClient.get(`${this.API_URL}/api/Complain/GetUserComplaints`, { params });
  }

  getUserComplaintStatus(UserID: string, CMyComplaint: number | string) {
    const params = new HttpParams().set("UserID", UserID).set("Where", "").set("Sorting", "").set("cStatus", "").set("CType", "").set("CMyComplaint", CMyComplaint.toString());
    return this.httpClient.get(`${this.API_URL}/api/Complain/GetUserComplaints`, { params }).pipe(map((res: any) => res.Table));
  }

  GetComplainRemarks(RID: number) {
    return this.httpClient.get(`${this.API_URL}/api/Complain/GetComplainRemarks?Id=${RID}`);
  }

  //#endregion
}
