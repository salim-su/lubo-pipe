import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HomepageService } from '../../../service/homepage.service';
import * as moment from 'moment';
import { FaultService } from '../../../service/manage/fault.service';

@Component({
    selector: 'app-fault-pross',
    templateUrl: './fault-pross.component.html',
    styleUrls: ['./fault-pross.component.less'],
})
export class FaultProssComponent implements OnInit {

    form: FormGroup;
    @Input() record;
    radioValue = 'wubao';
    zerenrenValue = '';
    paigongDate = '';
    yijianValue = '';

    constructor(private fb: FormBuilder, private nzModalRef: NzModalRef, private message: NzMessageService, private faultService: FaultService) {
        this.form = this.fb.group({
            handleResult: new FormControl({ value: null, disabled: false }, Validators.required),
        });
    }

    ngOnInit(): void {
    }

    /*表单初始化*/
    formInit() {
        this.radioValue = 'wubao';
        this.zerenrenValue = '';
        this.paigongDate = '';
        this.yijianValue = '';
    }

    cancel() {
        this.nzModalRef.close();
    }

    tijiao() {
        console.log(this.form.value);
        if (this.radioValue === 'wubao') {
            this.faultService.mistake(this.record.recordId).subscribe(res => {
                this.nzModalRef.close();
                this.formInit();
            });
        } else if (this.radioValue === 'paigong') {
            const a = moment().format('YYYY-MM-DD HH:mm:ss');
            if (!this.zerenrenValue) {
                this.message.create('warning', `请输入责任人`);
                return;
            }
            if (a === 'Invalid date') {
                this.message.create('warning', `请输入派工时间`);
                return;
            }
            this.faultService.dispatch(this.record.recordId, this.zerenrenValue, a).subscribe(res => {
                this.nzModalRef.close();
                this.formInit();
            });
        } else if (this.radioValue === 'yichuzhi') {
            if (!this.yijianValue) {
                this.message.create('warning', `请输入处理意见`);
                return;
            }
            this.faultService.handle(this.record.recordId, this.yijianValue).subscribe(res => {
                this.nzModalRef.close();
                this.formInit();
            });
        }
    }

}
