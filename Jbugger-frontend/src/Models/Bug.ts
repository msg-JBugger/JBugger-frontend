import { SeverityEnum } from "./Enums/SeverityEnum";
import { StatusEnum } from "./Enums/StatusEnum";

export interface Bug{
    bugId: number;
    title: string;
    description: string;
    version: string;
    fixedRevision: string;
    targetDate: string;
    status: StatusEnum;
    severity: SeverityEnum;
    reporterUsername: string;
    assigneeUsername: string;
}