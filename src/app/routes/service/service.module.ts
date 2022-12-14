import { NgModule } from '@angular/core';
import { AuthService } from './system/auth.service';
import { DictionaryService } from './system/dictionary.service';
import { AccountService } from './system/account.service';
import { OrganService } from './system/organ.service';
import { PermissionService } from './system/permission.service';
import { RoleService } from './system/role.service';

const SYSTEM = [AuthService, DictionaryService, AccountService, OrganService, PermissionService, RoleService];

const MANAGE = [

];

@NgModule({
    providers: [ ...SYSTEM, ...MANAGE],
})
export class ServiceModule {
    constructor() {}
}
