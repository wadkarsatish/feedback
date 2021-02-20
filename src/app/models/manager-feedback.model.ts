import { IFeedback } from "./feeback.model";

export interface IManagerFeedback extends IFeedback {
    managerRating?: number;
    managerComment?: string;
}