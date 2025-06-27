export enum SURVEY_STATUS {
  ON_GOING = "Ongoing",
  COMPLETED = "Expired",
}

export interface Int_Survey {
  SID: number; // Survey ID
  CreatedDate: string; // Date when the survey was created
  ExpiredON: string; // Expiry date of the survey
  Title: string; // Title of the survey
  Description: string; // Description of the survey
  IsPublished: boolean; // Indicates whether the survey is published
  TotalQuestion: number; // Total number of questions in the survey
  TotalResponse: number; // Total number of responses received
  IsResponseDone: number; // Indicator if the response is done
  SurveyStatus: SURVEY_STATUS; // Status of the survey (e.g., Ongoing, Completed)
}
