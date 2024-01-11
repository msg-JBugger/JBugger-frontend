import { PermissionEnum } from "./Enums/PermissionEnum"

export interface Permission {
    permissionId: number;
    type: PermissionEnum;
    description: string;
}