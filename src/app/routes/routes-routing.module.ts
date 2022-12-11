import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
import { CallbackComponent } from './passport/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { AbilityGuardService } from './exception/ability-guard.service';

const routes: Routes = [
    {
        path: '',
        component: LayoutBasicComponent,
        canActivate: [SimpleGuard],
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent, data: { title: '首页', titleI18n: '首页' } },
            {
                path: 'manage',
                canActivate: [SimpleGuard],
                data: { title: '管理' },
                loadChildren: () => import('./manage/manage.module').then((m) => m.ManageModule),
            },
            {
                path: 'auth',
                canActivate: [SimpleGuard],
                data: { title: '权限' },
                loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
            },
        ],
    },
    // passport
    {
        path: 'passport',
        component: LayoutPassportComponent,
        children: [
            { path: 'login', component: UserLoginComponent, data: { title: '登录' } },
            { path: 'lock', component: UserLockComponent, data: { title: '锁屏' } },
        ],
    },
    // 单页不包裹Layout
    { path: 'passport/callback/:type', component: CallbackComponent },
    { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: environment.useHash,
            // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
            // Pls refer to https://ng-alain.com/components/reuse-tab
            scrollPositionRestoration: 'top',
        }),
    ],
    exports: [RouterModule],
})
export class RouteRoutingModule {}