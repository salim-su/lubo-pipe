import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';
import {ModalHelper} from '@delon/theme';
import {PipeService} from '../../pipe.service';

@Component({
    selector: 'app-locate-list',
    templateUrl: './locate-list.component.html',
    styleUrls: ['./locate-list.component.less'],

})
export class LocateListComponent implements OnInit {
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
        });
    }
}
