import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {ModalHelper} from '@delon/theme';
import {PipeService} from '../../pipe.service';

@Component({
    selector: 'app-statistics-list',
    templateUrl: './statistics-list.component.html',
    styleUrls: ['./statistics-list.component.less'],
})
export class StatisticsListComponent implements OnInit {
    form: FormGroup;
    pageInfo = {
        pi: 1,
        ps: 10,
        total: 0,
        loading: false,
    };
    dataList: any;
    deviceType = [];
    deviceList = [];
    selNo;

    constructor(private modal: ModalHelper, private pipeService: PipeService, private fb: FormBuilder) {
        const beginTime = moment().startOf('month').toDate();
        const endTime = new Date();
        this.form = this.fb.group({
            searchDate: new FormControl({value: [beginTime, endTime], disabled: false}),
            deviceNo: new FormControl({value: '', disabled: false}),
        });
    }

    ngOnInit(): void {
        this.pipeService.deviceList().subscribe(res => {
            this.deviceList = res;
            this.selNo = this.deviceList[0].no;
            this.form.patchValue({
                deviceNo: this.deviceList[0].no
            });
            this.load();
        });
    }

    load() {
        const params = {
            current: this.pageInfo.pi,
            size: this.pageInfo.ps,
        };

        if (this.form.value.searchDate.length > 0) {
            params['beginTime'] = moment(this.form.value.searchDate[0]).format('YYYY-MM-DD HH:mm:ss');
            params['endTime'] = moment(this.form.value.searchDate[1]).format('YYYY-MM-DD HH:mm:ss');
        }
        params['deviceNo'] = this.form.value.deviceNo;
        console.log(params);

        this.pageInfo.loading = true;
        this.pipeService.upDataLogPage(params).subscribe((res) => {
            this.dataList = res.records;
            if (this.dataList.length > 0) {
                this.dataList.forEach((e) => {
                    e['jsonData'] = JSON.parse(e['jsonData']);
                });
            }
            this.pageInfo.total = res.total;
            this.pageInfo.loading = false;
        });
    }

    search() {
        this.load();
    }
}
