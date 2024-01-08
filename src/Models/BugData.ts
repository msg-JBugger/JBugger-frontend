import { Bug } from "./Bug";

export interface BugData{
    pageNumber: number;
    pageSize: number;
    totalPagesCount: number,
    totalResultsCount: number,
    items: Bug[]
}