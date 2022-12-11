import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { StatisticsService } from '../../../service/manage/statistics.service';

@Component({
    selector: 'app-report-water',
    templateUrl: './water.component.html',
    styleUrls: ['./water.component.less'],
})
export class ReportWaterComponent implements OnInit {
    form: FormGroup;
    pageInfo = {
        pi: 1,
        ps: 10,
        total: 0,
        loading: false,
    };
    dataList: any;

    constructor(private fb: FormBuilder, private statisticsService: StatisticsService, private router: Router) {
        const beginDate = moment().startOf('month').toDate();
        const endDate = new Date();
        this.form = this.fb.group({
            searchDate: new FormControl({ value: [beginDate, endDate], disabled: false }),
        });
    }

    ngOnInit(): void {
        this.loadList();
    }

    loadList() {
        const params = {
            current: this.pageInfo.pi,
            size: this.pageInfo.ps,
        };
        if (this.form.value.searchDate.length > 0) {
            params['beginDate'] = moment(this.form.value.searchDate[0]).format('YYYY-MM-DD HH:mm:ss');
            params['endDate'] = moment(this.form.value.searchDate[1]).format('YYYY-MM-DD HH:mm:ss');
        }
        this.pageInfo.loading = true;
        this.statisticsService.reportWaterList(params).subscribe((res) => {
            this.dataList = res.records;
            this.pageInfo.total = res.total;
            this.pageInfo.loading = false;
        });
    }

    export() {
        if (this.form.value.searchDate.length === 0) {
            return;
        }
        const params = {
            beginDate: moment(this.form.value.searchDate[0]).format('YYYY-MM-DD HH:mm:ss'),
            endDate: moment(this.form.value.searchDate[1]).format('YYYY-MM-DD HH:mm:ss'),
        };
        this.statisticsService.reportWaterExport(params);
    }
}
