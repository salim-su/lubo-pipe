import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { AuthDictEditRootComponent } from '../../dict/edit-root/edit-root.component';
import { AuthDictItemsComponent } from '../../dict/items/items.component';
import { AuthDictService } from '../../dict/service/dict.service';

@Component({
  selector: 'app-auth-business-dict-manage-list',
  templateUrl: './list.component.html',
})
export class AuthBusinessDictManageListComponent implements OnInit {
  subsystemCode = '';
  searchForm: FormGroup;
  dataList = [];
  pageInfo = {
    pi: 1,
    ps: 10,
    total: 0,
    loading: false,
  };
  dicType: any;

  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
    private modal: ModalHelper,
    private dictSrv: AuthDictService,
    private drawerService: NzDrawerService,
    private activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe(val => {
      if (window.location.href.indexOf('system-dict-manage') !== -1) {
        this.dicType = 'system';
      } else {
        this.dicType = 'business';
      }

      this.subsystemCode = val.code;
      this.searchForm = this.fb.group({
        dictValue: [null],
        code: [null],
        subsystemCode: this.subsystemCode,
      });

      this.load();
    });

  }

  ngOnInit() {
  }

  add() {
    this.modal.create(AuthDictEditRootComponent, {
      title: '新建',
      subsystemCode: this.subsystemCode,
      dicType: this.dicType,
    }, {
      size: 'md',
    }).subscribe(res => this.load());
  }

  edit(record) {
    this.modal.create(AuthDictEditRootComponent, {
      title: '编辑',
      record,
      subsystemCode: this.subsystemCode,
      dicType: this.dicType,
    }, {
      size: 'md',
    }).subscribe(res => this.load());
  }

  reset() {
    this.pageInfo.pi = 1;
    this.searchForm.reset();
    this.load();
  }

  search() {
    this.pageInfo.pi = 1;
    this.load();
  }

  remove(record) {
    if (this.dicType === 'business') {
      this.dictSrv.removeBiz(record.id).subscribe(() => {
        this.load();
      });
    } else if (this.dicType === 'system') {
      this.dictSrv.remove(record.id).subscribe(() => {
        this.load();
      });
    }
  }

  load() {
    const params = {
      ...this.searchForm.value,
      current: this.pageInfo.pi,
      size: this.pageInfo.ps,
      subsystemCode: this.subsystemCode,
    };
    this.pageInfo.loading = true;
    if (this.dicType === 'business') {
      this.dictSrv.parentListBiz(params).subscribe(res => {
        this.dataList = res.records;
        this.pageInfo.total = res.total;
        this.pageInfo.loading = false;
      });
    } else if (this.dicType === 'system') {
      this.dictSrv.parentList(params).subscribe(res => {
        this.dataList = res.records;
        this.pageInfo.total = res.total;
        this.pageInfo.loading = false;
      });
    }
  }

  showItems(record) {
    this.drawerService.create({
      nzContent: AuthDictItemsComponent,
      nzContentParams: {
        parentId: record.id,
        parentName: record.dictValue,
        parentCode: record.code,
        subsystemCode: this.subsystemCode,
        dicType: this.dicType,
      },
      nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
      nzTitle: '字典项-' + record.dictValue,
      nzWidth: '80%',
      nzHeight: '100%',
    }).afterClose.subscribe((res: any) => {
      if (res) {
        this.load();
      }
    });
  }
}
