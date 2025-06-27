export class Cls_TaskProjectMaster {
  TPID?: number;
  TPCDate?: string;
  TPHeader?: string;
  TPDescription?: string;
  TPCreator?: number;
  TPCreatorName?: string;
  TPPeriod?: number;
  TPPriority?: number;
  TPStartDate?: string;
  TPExpDueDate?: string;
  TPStatus?: number;
  TPActualCompletionDate?: string;
  TPActualCompletionBy?: number;
  TaskProjectMemberList?: Cls_TaskProjectMemberList[];
  TaskMaster?: Cls_TaskMaster[];
  TaskAssigneeDetails?: Cls_TaskAssigneeDetails[];
  TaskAssigneeCheckList?: Cls_TaskAssigneeCheckList[];
  isFound?: boolean;
  TaskSelectedMemberList?: Cls_TaskSelectedMemberList[];
}

export class Cls_TaskProjectMemberList {
  TPMID?: number;
  TPID?: number;
  TPAssignTo?: number;
  IsActive?: boolean;
}

export class Cls_TaskSelectedMemberList {
  TPMID?: number;
  TPID?: number;
  TPAssignTo?: number;
  IsActive?: boolean;
}

export class Cls_TaskAssigneeDetails {
  TDID?: number;
  TID?: number;
  TAssignTo?: number;
  TDPeriod?: number;
  Status?: number;
  TStartDate?: string;
  TCompletionDate?: string;
  TAssigneeIsActive?: boolean;
  CreatedBy?: number;
}

export class Cls_TaskAssigneeCheckList {
  TDID?: number;
  TAssignTo?: number;
  TCLDescription?: string;
  CheckedDate?: Date;
  TID?: number;
  ACLID?: number;
  IsChecked?: boolean;
  UpdateBy?: number;
  UpdateDate?: Date;
  CheckListIsActive?: boolean;
}

export interface Cls_TaskProjectDocsList {
  TPDID: number;
  TPID: number;
  TPDocDesc: string;
  TPDocCaption: string;
  TPDocContType: string;
  TPDocFileName: string;
  TPIsActive: boolean;
  TPDocFileImage: string;
  TPDocStatus: string;
  TPDocUploadBy: number;
}

export class Cls_TaskMaster {
  TID?: number;
  TDate?: string;
  TaskNo?: number;
  ProjectID?: number;
  TPHeader?: string;
  DID?: number;
  GroupID?: number;
  THeader?: string;
  TDescription?: string;
  TCreatorName?: string;
  TCreator?: number;
  TPeriod?: number;
  TPriority?: number;
  TTaskType?: number;
  TaskStatus?: number;
  StartDate?: string;
  DueDate?: string;
  ActualStartDate?: string;
  ActualDueDate?: string;
  TaskCompletionDate?: string;
  CreateDate?: string;
  CreateBy?: number;
  UpdateDate?: string;
  UpdateBy?: number;
  TaskAssigneeDetails?: Cls_TaskAssigneeDetails[];
  TaskAssigneeCheckList?: Cls_TaskAssigneeCheckList[];
  TaskDocsList?: Cls_TaskDocsList[];
  ApplicantFeedBack?: boolean;
  ApplicantFeedBackNote?: string;
  ApplicantFeedBackDateTime?: string;
  TaskDependentName?: string;
  isFound?: boolean;
  TaskDueDate?: string;
  TaskColorSchema?: string;
  TaskStartDate?: string;
}

export class Cls_TaskDocsList {
  TDID?: number;
  TID?: number;
  TDocDesc?: string;
  TDocCaption?: string;
  TDocContType?: string;
  TDocFileName?: String;
  TIsActive?: boolean;
  TDocFileImage?: string;
  TDocStatus?: string;
  TDocUploadBy?: number;
  DocIsActive?: boolean;
}

export class Cls_UpdateTaskAssigneeCheckList {
  TID?: number;
  ACLID?: number;
  IsChecked?: boolean;
  UpdateBy?: number;
}
