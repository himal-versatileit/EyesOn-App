import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Cls_TaskMaster, Cls_TaskProjectMaster, Cls_UpdateTaskAssigneeCheckList } from "../models/task";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  constructor(private httpClient: HttpClient) {
    this.API_URL = environment.API_URL;
  }

  private API_URL: string = "";

  //#region POST

  AddNewProject(data: Cls_TaskProjectMaster) {
    return this.httpClient.post(`${this.API_URL}/api/MobileApi/AddTaskProjectMasterApp`, data);
  }

  AddNewTask(data: Cls_TaskProjectMaster) {
    return this.httpClient.post(`${this.API_URL}/api/TaskManager/AddNewTask`, data);
  }

  //#region GET

  GetMemberList() {
    return this.httpClient.get(`${this.API_URL}/api/User/GetUserActiveAll`);
  }

  GetProjectList(UID: number) {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/GetTaskProjectByUserID?UserID=${UID}`);
  }

  GetTaskList(Where: string = "", Sorting: string = "") {
    const params = new HttpParams().set("Where", Where || "").set("Sorting", Sorting || "");
    return this.httpClient.get(`${this.API_URL}/api/TaskManager/GetTaskDetailsByQuery?`, { params });
  }

  GetTaskDetails(TID: number) {
    return this.httpClient.get(`${this.API_URL}/api/MobileApi/GetTaskDetailsByTID?TID=${TID}`);
  }

  GetTaskProjectDetails(TPID: number) {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/GetTaskProjectDetailsByTPID?TPID=${TPID}`);
  }

  GetAllTaskList(Where: string = "", Sorting: string = "") {
    const params = new HttpParams().set("Where", Where || "").set("Sorting", Sorting || "");
    return this.httpClient.get(`${this.API_URL}/api/TaskManager/GetTaskByQuery?`, { params });
  }

  GetTaskByAssignee(UserID: number) {
    return this.httpClient.get(`${this.API_URL}/api/MobileAPI/GetTaskByAssigneeApp?UserID=${UserID}`);
  }

  //#region PUT

  UpdateCheckList(data: Cls_UpdateTaskAssigneeCheckList) {
    return this.httpClient.put(`${this.API_URL}/api/TaskManager/UpdateTaskAssigneeCheckList`, data);
  }

  UpdateTaskStatus(data: Cls_TaskMaster) {
    return this.httpClient.put(`${this.API_URL}/api/TaskManager/UpdateTaskStatusChanged`, data);
  }

  //#endregion
}
