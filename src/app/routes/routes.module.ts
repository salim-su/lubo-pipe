import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
import { CallbackComponent } from './passport/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { RouteRoutingModule } from './routes-routing.module';
import { LayoutModule } from '../layout/layout.module';
import { ModalDashboardComponent } from './dashboard/modal-dashboard/modal-dashboard.component';

const COMPONENTS: Type<void>[] = [
  DashboardComponent,
  // passport pages
  UserLoginComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
];
const COMPONENTS_NOROUNT: Type<void>[] = [];

@NgModule({
    imports: [SharedModule, RouteRoutingModule, LayoutModule],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    ModalDashboardComponent,
  ],
})
export class RoutesModule {}
