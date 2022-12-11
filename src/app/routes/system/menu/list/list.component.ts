import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { STColumn, STComponent } from '@delon/abc/st';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { ArrayService } from '@delon/util';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TableUtils } from '../../../../shared/utils/tableUtils';
import { AuthAppEditComponent } from '../../app/edit/edit.component';
import { AuthAppService } from '../../app/service/app.service';
import { AuthMenuEditComponent } from '../edit/edit.component';
import { AuthMenuService } from '../service/menu.service';


@Component({
  selector: 'app-auth-menu-list',
  templateUrl: './list.component.html',
})
export class AuthMenuListComponent implements OnInit {

  searchForm: FormGroup;
  apps = [];
  menus = [];
  expandedMenus = [];
  selectedApp: any = {};
  loadingMenus = false;

  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '序号', width: '150px', type: 'no' },
    { title: '菜单名称', index: 'name' },
    { title: '菜单别名', width: '150px', index: 'alias' },
    { title: '路由地址', width: '20%', index: 'path' },
    { title: '菜单图标', width: '20%', index: 'source' },
    { title: '菜单编码', width: '150px', index: 'code' },
    { title: '排序', width: '150px', index: 'sort' },
    { title: '类型', width: '150px', index: 'category' },
    {
      title: '操作', width: '150px',
      buttons: [
        {
          text: '编辑', type: 'modal',
          modal: {
            component: AuthAppEditComponent,
          },
          size: 'md',
          click: (_record, modal) => {
          },
        },
        {
          text: '删除', type: 'del',
          click: (record, _modal, comp) => {
          },
        },
      ],
    },
  ];


  constructor(
    private http: _HttpClient,
    private modalHelper: ModalHelper,
    private appSrv: AuthAppService,
    private menuSrv: AuthMenuService,
    public tableUtils: TableUtils,
    private arraySrv: ArrayService,
    private msgStv: NzMessageService,
    private modalService: NzModalService,
    private drawerService: NzDrawerService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      name: [null],
      code: [null],
    });
    this.loadApps();
  }

  add() {
    if (this.selectedApp === null || this.selectedApp === undefined) {
      this.msgStv.warning('请选择子系统！');
      return;
    }

    const record = {
      subsystemId: this.selectedApp.id,
    };

    this.drawerService.create({
      nzContent: AuthMenuEditComponent,
      nzContentParams: {
        record,
      },
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzTitle: '新建',
      nzWidth: '50%',
      nzHeight: '100%',
    }).afterClose.subscribe((res: any) => {
      this.loadMenus(this.getExpendedKeys());
    });
  }

  edit(record) {
    record.subsystemId = this.selectedApp.id,
    this.drawerService.create({
      nzContent: AuthMenuEditComponent,
      nzContentParams: {
        record,
      },
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzTitle: '编辑',
      nzWidth: '50%',
      nzHeight: '100%',
    }).afterClose.subscribe((res: any) => {
      this.loadMenus(this.getExpendedKeys());
    });
  }

  remove(record) {
    this.menuSrv.remove(record.id).subscribe(() => {
      this.loadMenus(this.getExpendedKeys());
    });
  }

  reset() {
    this.searchForm.reset();
    this.loadMenus();
  }

  search() {
    this.loadMenus();
  }

  loadApps() {
    this.appSrv.list(null).subscribe(data => {
      this.apps = data;
      if (this.apps.length > 0) {
        this.selectedApp = this.apps[0];
      }
      this.loadMenus();
    });
  }

  loadMenus(expendedKeys?) {
    this.loadingMenus = true;
    const params = this.searchForm.value;
    if (this.selectedApp !== null) {
      params.subsystemId = this.selectedApp.id;
    }

    this.menuSrv.treeList(params).subscribe(data => {
      this.loadingMenus = false;
      this.menus = data;
      this.expandedMenus = this.tableUtils.arrToExpandedData(this.menus, expendedKeys);
    });
  }

  clickApp(data) {
    this.selectedApp = data;
    this.loadMenus();
  }

  getExpendedKeys() {
    const keys = [];
    for (let rootMenu in this.expandedMenus) {
      this.arraySrv.visitTree(this.expandedMenus[rootMenu], menu => {
        if (menu.expand) {
          keys.push(menu.key);
        }
      });
    }
    return keys;
  }

}
