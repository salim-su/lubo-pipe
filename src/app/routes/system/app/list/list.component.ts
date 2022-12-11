import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { AuthAppEditComponent } from '../edit/edit.component';
import { AuthAppService } from '../service/app.service';

@Component({
  selector: 'app-auth-app-list',
  templateUrl: './list.component.html',
})
export class AuthAppListComponent implements OnInit {
  searchForm: FormGroup;
  dataList = [];
  pageInfo = {
    pi: 1,
    ps: 10,
    total: 0,
    loading: false,
  };

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private fb: FormBuilder,
    private modalHelper: ModalHelper,
    private appSrv: AuthAppService) {
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      name: [null],
      code: [null],
    });

    this.load();
  }

  add() {
    this.modalHelper.create(AuthAppEditComponent, {
      title: '新建',
    }, {
      size: 'md',
    }).subscribe(res => this.load());
  }

  edit(record) {
    this.modalHelper.create(AuthAppEditComponent, {
      title: '编辑',
      record,
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
    this.appSrv.remove(record.id).subscribe(() => {
      this.load();
    });
  }

  load() {
    const params = {
      ...this.searchForm.value,
      current: this.pageInfo.pi,
      size: this.pageInfo.ps,
    };
    this.pageInfo.loading = true;
    this.appSrv.page(params).subscribe(res => {
      this.dataList = res.records;
      this.pageInfo.total = res.total;
      this.pageInfo.loading = false;
    });
  }
}
