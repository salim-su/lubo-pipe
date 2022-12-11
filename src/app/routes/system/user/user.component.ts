import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from './user.service';
import { DeptService } from '../dept/dept.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { UserEditComponent } from './user-edit/user-edit.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserRoleComponent } from './user-role/user-role.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styles: [],
})
export class UserComponent implements OnInit {
    searchForm: FormGroup;
    pageInfo = {
        total: 0,
        pi: 1,
        ps: 10,
        loading: false,
    };
    dataList = [];
    setOfCheckedId = new Set();
    indeterminate = false;
    checkedAll = false;

    deptTree = [];
    checkedDept = null;
    expandAll = false;
    deptSearchValue = null;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private deptService: DeptService,
        private drawerService: NzDrawerService,
        private modelService: NzModalService,
        private msgService: NzMessageService,
    ) {
        this.searchForm = fb.group({
            account: [null],
            name: [null],
        });
    }

    ngOnInit(): void {
        this.loadDeptTree();
    }

    // ===== user start ===== //
    add() {
        this.modelService
            .create({
                nzContent: UserEditComponent,
                nzTitle: '新增 -- ' + this.checkedDept.fullName,
                nzFooter: null,
                nzComponentParams: {
                    dept: this.checkedDept,
                },
            })
            .afterClose.subscribe((res) => {
                if (res) {
                    this.loadUser();
                }
            });
    }

    search() {
        this.loadUser();
    }

    reset() {
        this.searchForm.reset();
        this.loadUser();
    }

    loadUser() {
        const queryData = {
            ...this.searchForm.value,
            deptId: this.checkedDept.id,
            current: this.pageInfo.pi,
            size: this.pageInfo.ps,
        };
        this.pageInfo.loading = true;
        this.userService.page(queryData).subscribe((res) => {
            this.dataList = res.records;
            this.pageInfo.total = res.total;
            this.pageInfo.loading = false;
        });
    }

    edit(data) {
        this.modelService
            .create({
                nzContent: UserEditComponent,
                nzTitle: '新增 -- ' + this.checkedDept.fullName,
                nzFooter: null,
                nzComponentParams: {
                    self: data,
                },
            })
            .afterClose.subscribe((res) => {
                if (res) {
                    this.loadUser();
                }
            });
    }

    resetPassword(data) {
        this.userService.resetPassword(data.id).subscribe((res) => {
            this.msgService.info(data.account + '，密码已经重置');
        });
    }

    remove(data) {
        this.userService.remove(data.id).subscribe((res) => {
            this.msgService.info(data.account + '，已删除');
            this.loadUser();
        });
    }

    setupRole(data?) {
        const params = {};
        if (data) {
            params['user'] = data;
        } else {
            params['userIds'] = Array.from(this.setOfCheckedId);
        }

        this.drawerService
            .create({
                nzContent: UserRoleComponent,
                nzContentParams: {
                    ...params,
                },
                nzTitle: '分配角色',
                nzFooter: null,
            })
            .afterClose.subscribe((res) => {
                if (res) {
                    this.loadUser();
                }
            });
    }

    onAllChecked($event) {
        this.dataList.forEach((item) => this.updateCheckedSet(item.id, $event));
        this.refreshCheckedStatus();
    }

    onItemChecked(id, $event) {
        this.updateCheckedSet(id, $event);
        this.refreshCheckedStatus();
    }

    refreshCheckedStatus(): void {
        this.checkedAll = this.dataList.every((item) => this.setOfCheckedId.has(item.id));
        this.indeterminate = this.dataList.some((item) => this.setOfCheckedId.has(item.id)) && !this.checkedAll;
    }

    updateCheckedSet(id: number, checked: boolean): void {
        if (checked) {
            this.setOfCheckedId.add(id);
        } else {
            this.setOfCheckedId.delete(id);
        }
    }

    // ===== user end ===== //

    // ===== dept start ===== //
    loadDeptTree() {
        this.deptService.getCompanyTreeList({}).subscribe((res) => {
            this.deptTree = res;
            this.expandAll = true;

            if (res && res.length > 0) {
                this.checkedDept = res[0];
                this.loadUser();
            }
        });
    }

    onClickDept($event) {
        this.checkedDept = $event.node.origin;
        this.loadUser();
    }

    // ===== dept end ===== //
}
