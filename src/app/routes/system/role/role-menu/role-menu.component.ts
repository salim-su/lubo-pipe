import { Component, Input, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { ArrayService } from '@delon/util';
import { zip } from 'rxjs';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-role-menu',
  templateUrl: './role-menu.component.html',
  styles: [],
})
export class RoleMenuComponent implements OnInit {

  @Input()
  role = null;
  nodes = [];
  expandAll = false;
  grantData = {
    roleIds: [],
    menuIds: [],
    dataScopeIds: [],
    apiScopeIds: [],
  };

  constructor(
    private service: RoleService,
    private aryService: ArrayService,
    private drawerRef: NzDrawerRef,
    private msgService: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.aryService.visitTree([this.role], (item) => {
      this.grantData.roleIds.push(item.id);
    });

    zip(
      this.service.treeSubsystemMenu(),
      this.service.menuKeysByRole(this.role.id),
    ).subscribe(([grantTree, byRole]) => {
      this.nodes = grantTree;

      this.grantData.apiScopeIds = byRole.apiScope;
      this.grantData.dataScopeIds = byRole.dataScope;
      this.grantData.menuIds = byRole.menu;

      this.expandAll = true;
    });
  }

  nzCheck(event): void {
    this.grantData.menuIds = [];
    this.aryService.treeToArr(event.checkedKeys).map(item => {
      if (item.origin.code !== 'subsystem') {
        this.grantData.menuIds.push(item.key);
      }
    });
  }

  close() {
    this.drawerRef.close(true);
  }

  submit() {
    const grantData = {};
    for (const grantDataKey in this.grantData) {
      grantData[grantDataKey] = Array.from(new Set(this.grantData[grantDataKey]));
    }

    this.service.grant(grantData).subscribe((res) => {
      this.msgService.info('配置成功!');
    });
  }
}
