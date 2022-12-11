import { Component, Input, OnInit } from '@angular/core';
import { RoleService } from '../../role/role.service';
import { ArrayService } from '@delon/util';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { zip } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styles: [],
})
export class UserRoleComponent implements OnInit {

  @Input()
  user = null;
  @Input()
  userIds = null;
  expandAll = false;
  nodes = [];
  grantData = {
    userIds: [],
    roleIds: []
  };

  constructor(
    private service: UserService,
    private aryService: ArrayService,
    private drawerRef: NzDrawerRef,
    private msgService: NzMessageService,
    private roleService: RoleService,
  ) {
  }

  ngOnInit(): void {
    this.roleService.list(null).subscribe((res) => {
      this.nodes = res;
      this.expandAll = true;

      if (this.userIds) {
        this.grantData.userIds = this.userIds;
      }

      if (this.user) {
        this.grantData.userIds = [this.user.id];
        this.grantData.roleIds = this.user.roleId.split(',');
      }
    });
  }

  nzCheck(event): void {
    this.grantData.roleIds = [];
    this.aryService.treeToArr(event.checkedKeys).map(item => {
      this.grantData.roleIds.push(item.key);
    });
  }

  close() {
    this.drawerRef.close(false);
  }

  submit() {
    const grantData = {};
    for (const grantDataKey in this.grantData) {
      grantData[grantDataKey] = Array.from(new Set(this.grantData[grantDataKey])).join(',');
    }

    this.service.grant(grantData).subscribe((res) => {
      this.msgService.info('配置成功!');
      this.drawerRef.close(true);
    });
  }
}
