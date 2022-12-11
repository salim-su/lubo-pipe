import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { ArrayService } from '@delon/util';
import { environment } from '@env/environment';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'layout-platform-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
  styleUrls: ['./sidebar.component.less'],

})
export class PlatformSidebarComponent implements OnInit {
  sidebarWidth = 220;
  pfsidebar = [];
  selectedPlatForm: any = 1;
  showItem = false;
  timeOut: any;
  menus = [];
  navList = [];
  openMap: { [name: string]: boolean } = {};

  constructor(iconSrv: NzIconService,
              public settings: SettingsService,
              private menuService: MenuService,
              private settingService: SettingsService,
              private aclService: ACLService,
              private titleService: TitleService,
              private router: Router,
              private httpClient: HttpClient,
              private arrayService: ArrayService,
              @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    this.navList = this.menuService.menus;
    this.navList.forEach(res => {
      this.openMap[res.id] = false;
    });
  }

  ngOnInit() {
    this.pfsidebar = this.settingService.user.subsystem;
    this.loadMenuAndButton();
    this.menus = this.menuService.menus;
    this.morenindex();

  }

  clickMenu(item) {
    this.router.navigate([item.link], {});
  }

  morenindex() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].__id === this.selectedPlatForm) {
        this.router.navigateByUrl(this.menus[i].path);
      }
    }
  }

  clickPlatForm(item) {
    this.selectedPlatForm = item.__id;
    this.router.navigateByUrl(item.path);
  }

  convertToMenu(data) {
    this.arrayService.visitTree(data, item => {
      item.text = item.name;
      item.link = item.path;
      item.isLeaf = !item.hasOwnProperty('children') || item.children.length === 0;
    });
    return data;
  }

  loadMenuAndButton() {
    this.httpClient.get('blade-system/menu/routes?subsystemId=' + environment.subsystem.plateform.id).subscribe(res => {
    });
  }

  enter() {
    this.sidebarWidth = 200;
    // this.showItem = true;

    this.timeOut = setTimeout(res => {
      this.showItem = true;
    }, 200);


    // setTimeout(res=>{
    //     this.showItem = true;
    // },200)
  }

  leave() {
    clearTimeout(this.timeOut);
    this.showItem = false;
    this.sidebarWidth = 70;

    // setTimeout(res=>{
    //     this.sidebarWidth = 70;
    // },200)
  }

  goTo(s: string) {
    this.router.navigateByUrl(s);
  }

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

}
