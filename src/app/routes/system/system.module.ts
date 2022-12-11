import { CommonModule } from '@angular/common';
import { AuthBusinessDictManageListComponent } from './dict-manage/list/list.component';
import { DeptEditComponent } from './dept/dept-edit/dept-edit.component';
import { AuthDictEditItemComponent } from './dict/edit-item/edit-item.component';
import { AuthDictEditRootComponent } from './dict/edit-root/edit-root.component';
import { AuthDictItemsComponent } from './dict/items/items.component';
import { AuthDictListComponent } from './dict/list/list.component';
import { RoleComponent } from './role/role.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { AuthAppEditComponent } from './app/edit/edit.component';
import { AuthAppListComponent } from './app/list/list.component';
import { DeptComponent } from './dept/dept.component';
import { AuthMenuEditComponent } from './menu/edit/edit.component';
import { AuthMenuListComponent } from './menu/list/list.component';
import { SystemRoutingModule } from './system-routing.module';
import { RoleMenuComponent } from './role/role-menu/role-menu.component';
import { UserComponent } from './user/user.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserRoleComponent } from './user/user-role/user-role.component';
import { ComponentsModule } from '../../shared/components/components.module';

const COMPONENTS = [
    DeptComponent,
    AuthAppListComponent,
    AuthMenuListComponent,
    RoleComponent,
    RoleEditComponent,
    AuthBusinessDictManageListComponent,
    UserComponent,
];
const COMPONENTS_NOROUNT = [
    AuthAppEditComponent,
    AuthMenuEditComponent,
    RoleEditComponent,
    RoleMenuComponent,
    DeptEditComponent,
    AuthDictEditItemComponent,
    AuthDictEditRootComponent,
    AuthDictItemsComponent,
    AuthDictListComponent,
    UserEditComponent,
    UserRoleComponent,
];
@NgModule({
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    imports: [CommonModule, SystemRoutingModule, SharedModule, ComponentsModule],
    entryComponents: COMPONENTS_NOROUNT,
})
export class SystemModule {}
