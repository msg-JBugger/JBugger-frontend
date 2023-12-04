import { SeverityEnum } from "./Enums/SeverityEnum";
import { StatusEnum } from "./Enums/StatusEnum";

export interface Bug{
    id?: number;
    title: string;
    description: string;
    version: string;
    fixedInVersion?: string;
    targetDate: Date;
    Severity?: SeverityEnum;
    createdBy: string;
    status?: StatusEnum;
    assignedTo?: string;
    associatedDocLocation?: string;
}