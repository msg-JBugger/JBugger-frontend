import { Bug } from "./Bug";
import { Comment } from "./Comment";
import { Attachment } from "./Attachment";
import { History } from "./History";

export interface BugDetailsData{
    bugAttributes: Bug,
    comments: Comment[];
    attachments: Attachment[];
    history: History[];
}