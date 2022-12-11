import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { ArrayService } from '@delon/util';
import { TableUtils } from '../../../../shared/utils/tableUtils';
import { AuthDictEditItemComponent } from '../edit-item/edit-item.component';
import { AuthDictService } from '../service/dict.service';

@Component({
  selector: 'app-auth-dict-items',
  templateUrl: './items.component.html',
})
export class AuthDictItemsComponent implements OnInit {

  @Input()
  parentId: string;
  @Input()
  parentName: string;
  @Input()
  parentCode: string;
  @Input()
  subsystemCode: string;
  @Input()
  dicType: string;

  searchForm: FormGroup;
  dataList = [];
  expandedItems = [];
  loading = false;

  constructor(
    private http: _HttpClient,
    private fb: FormBuilder,
    private modal: ModalHelper,
    private dictSrv: AuthDictService,
    public tableUtils: TableUtils,
    private arraySrv: ArrayService,
  ) {
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      dictValue: [null],
      dictKey: [null],
    });

    this.load();
  }

  add() {
    const record = {
      parentId: this.parentId,
      parentName: this.parentName,
      code: this.parentCode,
      subsystemCode: this.subsystemCode,
      dicType: this.dicType,
    };
    this.modal.create(AuthDictEditItemComponent, {
      title: '新建',
      record,
    }, {
      size: 'md',
    }).subscribe(res => this.load(this.getExpendedKeys()));
  }

  addChildren(item) {
    const record = {
      parentId: item.id,
      parentName: item.dictValue,
      code: this.parentCode,
      subsystemCode: this.subsystemCode,
      dicType: this.dicType,
    };
    this.modal.create(AuthDictEditItemComponent, {
      title: '新建',
      record,
    }, {
      size: 'md',
    }).subscribe(res => this.load(this.getExpendedKeys()));
  }

  edit(record) {
    record.subsystemCode = this.subsystemCode;
    record.dicType = this.dicType;
    this.modal.create(AuthDictEditItemComponent, {
      title: '编辑',
      record,
    }, {
      size: 'md',
    }).subscribe(res => this.load(this.getExpendedKeys()));
  }

  reset() {
    this.searchForm.reset();
    this.load();
  }

  search() {
    this.load();
  }
  remove(record) {
    if (this.dicType === 'business') {
      this.dictSrv.removeBiz(record.id).subscribe(() => {
        this.load(this.getExpendedKeys());
      });
    } else if (this.dicType === 'system') {
      this.dictSrv.remove(record.id).subscribe(() => {
        this.load(this.getExpendedKeys());
      });
    }
  }

  load(expendedKeys?) {
    const params = {
      code: this.parentCode,
      parentId: this.parentId,
      ...this.searchForm.value,
    };
    this.loading = true;
    if (this.dicType === 'business') {
      this.dictSrv.childListBiz(params).subscribe(res => {
        this.dataList = res;
        this.expandedItems = this.tableUtils.arrToExpandedData(this.dataList, expendedKeys);
        this.loading = false;
      });
    } else if (this.dicType === 'system') {
      this.dictSrv.childList(params).subscribe(res => {
        this.dataList = res;
        this.expandedItems = this.tableUtils.arrToExpandedData(this.dataList, expendedKeys);
        this.loading = false;
      });
    }
  }

  changeSealed(id, result) {
    const isSealed = result ? 0 : 1;
    if (this.dicType === 'business') {
      this.dictSrv.changeIsSealedBiz(id, isSealed).subscribe(() => {
      });
    } else if (this.dicType === 'system') {
      this.dictSrv.changeIsSealed(id, isSealed).subscribe(() => {
      });
    }
  }

  getExpendedKeys() {
    const keys = [];
    // tslint:disable-next-line:forin
    for (const item in this.expandedItems) {
      this.arraySrv.visitTree(this.expandedItems[item], menu => {
        if (menu.expand) {
          keys.push(menu.key);
        }
      });
    }
    return keys;
  }

}
