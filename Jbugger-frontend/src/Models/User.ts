import { Bug } from "./Bug"
import { Role } from "./Role"
import { Comment } from "./Comment"
import { Notification } from "./Notification"

export interface User{
    userId?: number;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    mobileNumber: string;
    enabled: boolean;
    roles: Set<Role>;
    authorities: Role[];
    notifications: Notification[];
    createdBugs: Set<Bug>;
    assignedBugs: Bug[];
    userComments: Comment[];
}