import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { ArrayService } from '@delon/util';

import { NzIconService } from 'ng-zorro-antd/icon';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { AuthService } from '../../routes/service/system/auth.service';
import { environment } from '@env/environment';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
    constructor(
        iconSrv: NzIconService,
        private menuService: MenuService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private httpClient: HttpClient,
        private injector: Injector,
        private arrayService: ArrayService,
        private authService: AuthService,
    ) {
        iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
        iconSrv.fetchFromIconfont({
            scriptUrl: 'https://at.alicdn.com/t/font_2364967_q5098md9tfc.js',
        });
    }

    private viaHttp(resolve: any, reject: any) {
        zip(
            // this.authService.getAuthInfo(),
            // this.httpClient.get('blade-user/info'),
            // this.httpClient.get('blade-system/subsystem/subsystemByUser'),
            this.httpClient.get('blade-system/menu/routes?subsystemId'),
            this.httpClient.get('blade-system/menu/buttons?subsystemId'),
        ).pipe(
            // catchError(([menus]) => {
            //     resolve(null);
            //     return [menus];
            // }),
            catchError(([menus, buttons]) => {
                resolve(null);
                return [ menus, buttons];
            }),
        ).subscribe(([ menus, buttons]) => {
                this.settingService.setApp({
                    name: '联盟国际智慧用电管理平台',
                    description: '',
                });
                // this.settingService.setUser({
                //     name: user.realName,
                //     avatar: './assets/tmp/img/avatar.jpg',
                //     email: 'cipchk@qq.com',
                //     subsystem,
                //     tenantId: user.tenantId,
                //     deptName: user.deptName,
                // });
                const menuData = this.convertToMenu(menus);
                this.menuService.add(menuData);
                // const aclData = this.convertToAclData(buttons);
                // this.aclService.setAbility(aclData);
                // Can be set page suffix title, https://ng-alain.com/theme/title
                // this.titleService.suffix = res.app.name;
            },
            () => {
            },
            () => {
                resolve(null);
            });
    }

    private viaMock(resolve: any, reject: any): void {
        // const tokenData = this.tokenService.get();
        // if (!tokenData.token) {
        //   this.injector.get(Router).navigateByUrl('/passport/login');
        //   resolve({});
        //   return;
        // }
        // mock
        const app: any = {
            name: `ng-alain`,
            description: `Ng-zorro admin panel front-end framework`,
        };
        const user: any = {
            name: 'Admin',
            avatar: './assets/tmp/img/avatar.jpg',
            email: 'cipchk@qq.com',
            token: '123456789',
        };
        // Application information: including site name, description, year
        this.settingService.setApp(app);
        // User information: including name, avatar, email address
        this.settingService.setUser(user);
        // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
        this.aclService.setFull(true);
        // Menu data, https://ng-alain.com/theme/menu
        this.menuService.add([
            {
                text: 'Main',
                group: true,
                children: [
                    {
                        text: 'Dashboard',
                        link: '/dashboard',
                        icon: { type: 'icon', value: 'appstore' },
                    },
                    {
                        text: '子系统',
                        link: '/system/app/list',
                        icon: { type: 'icon', value: 'appstore' },
                    },
                    {
                        text: '菜单管理',
                        link: '/system/menu/list',
                        icon: { type: 'icon', value: 'appstore' },
                    },
                ],
            },
        ]);
        // Can be set page suffix title, https://ng-alain.com/theme/title
        this.titleService.suffix = app.name;

        resolve({});
    }

    convertToMenu(data) {
        this.arrayService.visitTree(data, item => {
            item.text = item.name;
            item.link = item.path;
            item.isLeaf = !item.hasOwnProperty('children') || item.children.length === 0;
        });
        return data;
    }

    convertToAclData(data) {
        const arr = [];
        data.forEach(res => {
            if (res.hasOwnProperty('children') && res.children.length > 0) {
                res.children.forEach(e => {
                    arr.push(e.code);
                });
            }
        });
        return arr;
        // console.log(data[0].children);
        // return data[0].children.map(item => {
        //   return item.code;
        // });
    }

    load(): Promise<any> {
        // only works with promises
        // https://github.com/angular/angular/issues/15088
        return new Promise((resolve, reject) => {
            // http
            this.viaHttp(resolve, reject);
            // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
            // this.viaMock(resolve, reject);

        });
    }
}
