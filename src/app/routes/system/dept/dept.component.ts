import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalHelper } from '@delon/theme';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DeptService } from './dept.service';
import { DeptEditComponent } from './dept-edit/dept-edit.component';
import { ArrayService } from '@delon/util';
import { TableUtils } from '../../../shared/utils/tableUtils';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styles: [],
})
export class DeptComponent implements OnInit {
  searchForm: FormGroup;
  companyList = [];
  expandedCompanyList = [];
  loadingCompanyList = false;

  constructor(
    private modal: ModalHelper,
    private fb: FormBuilder,
    private modalService: NzModalService,
    private msgService: NzMessageService,
    private arraySrc: ArrayService,
    private service: DeptService,
    public tableUtils: TableUtils,
  ) {
    this.searchForm = this.fb.group({
      deptName: [null],
    });
  }

  ngOnInit() {
    this.loadCompanyList();
  }

  add(item?) {
    this.modalService.create({
      nzContent: DeptEditComponent,
      nzComponentParams: {
        parent: item
      },
      nzTitle: '新增',
      nzFooter: null,
    }).afterClose.subscribe((res) => {
      if (res) {
        this.loadCompanyList(this.getExpendedKeys());
      }
    });
  }

  search() {
    this.loadCompanyList();
  }

  reset() {
    this.searchForm.reset();
    this.loadCompanyList();
  }

  remove(item) {
    if (item.hasOwnProperty('children') && item.children.length > 0) {
      this.msgService.warning('请先删除子集!');
      return false;
    }
    this.service.remove(item.id).subscribe(() => {
      this.loadCompanyList(this.getExpendedKeys());
    });
  }

  edit(item) {
    this.modalService.create({
      nzContent: DeptEditComponent,
      nzComponentParams: {
         self: item
      },
      nzTitle: '编辑',
      nzFooter: null,
    }).afterClose.subscribe((res) => {
      if (res) {
        this.loadCompanyList(this.getExpendedKeys());
      }
    });
  }

  loadCompanyList(expendedKeys?) {
    this.loadingCompanyList = true;
    const params = this.searchForm.value;
    this.service.getCompanyTreeList(params).subscribe(res => {
      this.loadingCompanyList = false;
      this.companyList = res;
      if (expendedKeys === undefined && this.companyList.length > 0) {
        expendedKeys = [];
        this.companyList.forEach(p => {
          expendedKeys.push(p.id);
        });
      }
      this.expandedCompanyList = this.tableUtils.arrToExpandedData(this.companyList, expendedKeys);
    });
  }

  getExpendedKeys() {
    const keys = [];
    for (let rootMenu in this.expandedCompanyList) {
      this.arraySrc.visitTree(this.expandedCompanyList[rootMenu], menu => {
        if (menu.expand) {
          keys.push(menu.id);
        }
      });
    }
    return keys;
  }
}
