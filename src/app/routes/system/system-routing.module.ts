import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAppListComponent } from './app/list/list.component';
import { AuthBusinessDictManageListComponent } from './dict-manage/list/list.component';
import { DeptComponent } from './dept/dept.component';
import { RoleComponent } from './role/role.component';
import { AuthMenuListComponent } from './menu/list/list.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    { path: 'dept', component: DeptComponent },
    { path: 'role', component: RoleComponent },
    { path: 'user', component: UserComponent },
    { path: 'app/list', component: AuthAppListComponent },
    { path: 'menu/list', component: AuthMenuListComponent },
    { path: 'business-dict-manage/list/:code', component: AuthBusinessDictManageListComponent },
    { path: 'system-dict-manage/list/:code', component: AuthBusinessDictManageListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SystemRoutingModule {
}
