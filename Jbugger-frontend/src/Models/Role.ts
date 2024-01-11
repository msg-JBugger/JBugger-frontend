import { RolesEnum } from "./Enums/RolesEnum";
import { Permission } from "./Permission"

export interface Role{
   roleId: number;
   type: RolesEnum;
   permissions: Set<Permission>
}