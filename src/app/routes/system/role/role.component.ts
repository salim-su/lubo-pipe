import { Component, OnInit } from '@angular/core';
import { RoleService } from './role.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableUtils } from '../../../shared/utils/tableUtils';
import { NzModalService } from 'ng-zorro-antd/modal';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { ArrayService } from '@delon/util';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { RoleMenuComponent } from './role-menu/role-menu.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styles: [],
})
export class RoleComponent implements OnInit {
  searchForm: FormGroup;
  roleList = [];
  expandedRoleList = null;
  loadingroleList = false;


  constructor(
    private service: RoleService,
    private fb: FormBuilder,
    public tableUtils: TableUtils,
    private modalService: NzModalService,
    private msgService: NzMessageService,
    private arraySrc: ArrayService,
    private drawerService: NzDrawerService
  ) {
    this.searchForm = fb.group({
      roleName: [null],
      roleAlias: [null],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(expendedKeys?) {
    const params = {
      ...this.searchForm.value
    };
    this.loadingroleList = true;
    this.service.list(params).subscribe(res => {
      this.loadingroleList = false;
      this.roleList = res;
      if (expendedKeys === undefined && this.roleList.length > 0) {
        expendedKeys = [];
        this.roleList.forEach(p => {
          expendedKeys.push(p.id);
        });
      }
      this.expandedRoleList = this.tableUtils.arrToExpandedData(this.roleList, expendedKeys);
    });
  }

  add(item?) {
    this.modalService.create({
      nzContent: RoleEditComponent,
      nzComponentParams: {
        parent: item
      },
      nzTitle: '新增',
      nzFooter: null,
    }).afterClose.subscribe((res) => {
      if (res) {
        this.loadData(this.getExpendedKeys());
      }
    });
  }

  search() {
    this.loadData();
  }

  reset() {
    this.searchForm.reset();
    this.loadData();
  }

  edit(item: any) {
    this.modalService.create({
      nzContent: RoleEditComponent,
      nzComponentParams: {
        self: item
      },
      nzTitle: '编辑',
      nzFooter: null,
    }).afterClose.subscribe((res) => {
      if (res) {
        this.loadData(this.getExpendedKeys());
      }
    });
  }

  remove(item: any) {
    if (item.hasOwnProperty('children') && item.children.length > 0) {
      this.msgService.warning('请先删除子集!');
      return false;
    }
    this.service.remove(item.id).subscribe((res) => {
      this.loadData(this.getExpendedKeys());
    });
  }

  menuSet(item: any) {
    this.drawerService.create({
      nzContent: RoleMenuComponent,
      nzTitle: '菜单设置 --' + item.roleName,
      nzContentParams: {
        role: item,
      }
    });
  }

  getExpendedKeys() {
    const keys = [];
    for (let rootMenu in this.expandedRoleList) {
      this.arraySrc.visitTree(this.expandedRoleList[rootMenu], menu => {
        if (menu.expand) {
          keys.push(menu.id);
        }
      });
    }
    return keys;
  }
}
