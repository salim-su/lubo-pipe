import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ModalHelper} from '@delon/theme';
import {PipeService} from '../../pipe.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-pipe-alarm-list',
    templateUrl: './pipe-alarm-list.component.html',
    styleUrls: ['./pipe-alarm-list.component.less'],
})
export class PipeAlarmListComponent implements OnInit {
    form: FormGroup;
    pageInfo = {
        pi: 1,
        ps: 10,
        total: 0,
        loading: false,
    };
    dataList: any;

    constructor(private modal: ModalHelper, private pipeService: PipeService, private fb: FormBuilder) {
        const beginTime = moment().startOf('month').toDate();
        const endTime = new Date();
        this.form = this.fb.group({
            searchDate: new FormControl({ value: [beginTime, endTime], disabled: false }),
        });
    }

    ngOnInit(): void {
        this.load();
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
        console.log(params);

        this.pageInfo.loading = true;
        this.pipeService.alarmPage(params).subscribe((res) => {
            this.dataList = res.records;
            this.pageInfo.total = res.total;
            this.pageInfo.loading = false;
        });
    }

    search() {
        this.load();
    }
}
