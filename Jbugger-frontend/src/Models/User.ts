import { RolesEnum } from "./Enums/RolesEnum";

export interface User{
    id?: number;
    username: string;
    password: string;
    firstname: string;
    surname: string;
    mobileNumber: string;
    email: string;
    roles: RolesEnum[];
}