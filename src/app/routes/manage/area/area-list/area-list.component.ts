import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AreaService } from '../../../service/manage/area.service';
import { AreaEditComponent } from '../area-edit/area-edit.component';
import { ModalHelper } from '@delon/theme';

@Component({
    selector: 'app-area-list',
    templateUrl: './area-list.component.html',
    styleUrls: ['./area-list.component.less'],

})
export class AreaListComponent implements OnInit {
    form: FormGroup;
    pageInfo = {
        pi: 1,
        ps: 10,
        total: 0,
        loading: false,
    };
    dataList: any;

    constructor(private fb: FormBuilder, private areaService: AreaService, private modal: ModalHelper) {
        this.form = this.fb.group({
            mingcheng: new FormControl({ value: null, disabled: false }, Validators.required),
        });
    }

    ngOnInit(): void {
        this.load();
    }

    add() {
        this.modal
            .open(AreaEditComponent, {}, 600, {
                nzClassName: 'alarmModalStyle',

            })
            .subscribe(data => {
                if (data !== undefined) {
                    this.load();
                }
            });
    }

    edit(record) {
        this.modal
            .open(AreaEditComponent, {
                record,
            }, 600, {
                nzClassName: 'alarmModalStyle',
                // nzTitle: '编辑',
                // nzFooter: [
                //     {
                //         label: '取消',
                //         onClick: (componentInstance) => componentInstance.cancel(),
                //     },
                //     {
                //         label: '保存',
                //         type: 'primary',
                //         onClick: (componentInstance) => componentInstance.submit(),
                //     },
                // ],
            })
            .subscribe(data => {
                if (data !== undefined) {
                    this.load();
                }
            });
    }


    load(): void {
        const params = {
            current: this.pageInfo.pi,
            size: this.pageInfo.ps,
        };
        this.pageInfo.loading = true;
        this.areaService.page(params).subscribe(res => {
            this.dataList = res.records;
            this.pageInfo.total = res.total;
            this.pageInfo.loading = false;
        });
    }

    remove(data: any) {
        this.areaService.remove(data.id).subscribe(() => {
            this.load();
        });
    }
}
