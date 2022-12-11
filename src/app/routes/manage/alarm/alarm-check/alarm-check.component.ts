import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
    selector: 'app-alarm-check',
    templateUrl: './alarm-check.component.html',
    styleUrls: ['./alarm-check.component.less'],
})
export class AlarmCheckComponent implements OnInit {
    form: FormGroup;
    @Input() record;

    radioValue = 'wubao';
    zerenrenValue = '';
    paigongDate = '';
    yijianValue = '';

    constructor(private fb: FormBuilder, private nzModalRef: NzModalRef) {
        this.form = this.fb.group({
            handleResult: new FormControl({ value: null, disabled: false }),
            handleTime: new FormControl({ value: null, disabled: false }),
        });
    }

    ngOnInit(): void {
        console.log(this.record);
        if (this.record.status === 1) {
            this.radioValue = 'wubao';
        } else if (this.record.status === 2) {
            this.radioValue = 'paigong';
            this.zerenrenValue = this.record.dispatchResponsiblePerson;
            this.paigongDate = this.record.dispatchTime;
        } else if (this.record.status === 3) {
            this.radioValue = 'yichuzhi';
            this.yijianValue = this.record.handleResult;
        }
        this.form.patchValue(this.record);
    }
}
