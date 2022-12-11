import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { AuthDictEditRootComponent } from '../edit-root/edit-root.component';
import { AuthDictService } from '../service/dict.service';
import { AuthDictItemsComponent } from '../items/items.component';

@Component({
    selector: 'app-auth-dict-list',
    templateUrl: './list.component.html',
})
export class AuthDictListComponent implements OnInit {

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
        private fb: FormBuilder,
        private modal: ModalHelper,
        private dictSrv: AuthDictService,
        private drawerService: NzDrawerService,
    ) {
    }

    ngOnInit() {
        this.searchForm = this.fb.group({
            dictValue: [null],
            code: [null],
        });

        this.load();
    }

    add() {
        this.modal.create(AuthDictEditRootComponent, {
            title: '新建',
        }, {
            size: 'md',
        }).subscribe(res => this.load());
    }

    edit(record) {
        this.modal.create(AuthDictEditRootComponent, {
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
        this.dictSrv.remove(record.id).subscribe(() => {
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
        this.dictSrv.parentList(params).subscribe(res => {
            this.dataList = res.records;
            this.pageInfo.total = res.total;
            this.pageInfo.loading = false;
        });
    }

    showItems(record) {
        this.drawerService.create({
            nzContent: AuthDictItemsComponent,
            nzContentParams: {
                parentId: record.id,
                parentName: record.dictValue,
                parentCode: record.code,
            },
            nzBodyStyle: { height: 'calc(100% - 55px)', overflow: 'auto', 'padding-bottom': '53px' },
            nzTitle: record.dictValue,
            nzWidth: '80%',
            nzHeight: '100%',
        }).afterClose.subscribe((res: any) => {
            if (res) {
                this.load();
            }
        });
    }
}
