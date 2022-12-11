import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AuthDictService } from '../service/dict.service';

@Component({
    selector: 'app-auth-dict-edit-item',
    templateUrl: './edit-item.component.html',
})
export class AuthDictEditItemComponent implements OnInit {
    @Input()
    record: any;
    @Input()
    title: string;

    form: FormGroup;

    constructor(
        private modal: NzModalRef,
        private msgSrv: NzMessageService,
        private http: _HttpClient,
        private fb: FormBuilder,
        private dictSrv: AuthDictService,
    ) {
        this.form = new FormGroup({
            id: new FormControl(null),
            parentId: new FormControl({ value: null }),
            parentName: new FormControl({ value: null, disabled: true }),
            dictValue: new FormControl(null, Validators.required),
            code: new FormControl({ value: null }, Validators.required),
            sort: new FormControl(null, Validators.required),
            dictKey: new FormControl(null, Validators.required),
            remark: new FormControl(null),
            subsystemCode: new FormControl({ value: null }),
        });
    }
    ngOnInit(): void {
        if (this.record !== undefined) {
            this.form.patchValue(this.record);
        }
    }

    save() {
        const isValid = this.validate();
        if (!isValid) {
            return;
        }
        const data = this.form.value;
        if (this.record.dicType === 'business') {
            this.dictSrv.submitBiz(data).subscribe(() => {
                this.msgSrv.success('保存成功');
                this.modal.close(true);
            });
        } else if (this.record.dicType === 'system') {
            this.dictSrv.submit(data).subscribe(() => {
                this.msgSrv.success('保存成功');
                this.modal.close(true);
            });
        }
    }

    validate() {
        for (const key in this.form.controls) {
            if (this.form.controls.hasOwnProperty(key)) {
                const element = this.form.controls[key];
                element.markAsDirty();
                element.updateValueAndValidity();
            }
        }

        return this.form.valid;
    }

    close() {
        this.modal.destroy();
    }
}
