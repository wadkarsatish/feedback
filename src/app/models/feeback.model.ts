import { IManagerFeedback } from "./manager-feedback.model";

export interface IFeedback {
    feedbackId?: number;
    empId: number;
    empName: string;
    projectId: number;
    rating: number;
    comment: string;
    isManagerFeedbackAdded: boolean;
}

export interface IFeedbackList extends IManagerFeedback {
    projectName: string;
} 