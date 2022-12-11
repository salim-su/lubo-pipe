import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthAppService } from '../service/app.service';

@Component({
    selector: 'app-auth-app-edit',
    templateUrl: './edit.component.html',
})
export class AuthAppEditComponent implements OnInit {
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
        private appSrv: AuthAppService,
    ) {
        this.form = this.fb.group({
            id: [null],
            name: [null, [Validators.required]],
            source: [null, [Validators.required]],
            path: [null, [Validators.required]],
            code: [null, [Validators.required]],
            sort: [null, [Validators.required]],
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
        this.appSrv.submit(data).subscribe(data => {
            this.msgSrv.success('保存成功');
            this.modal.close(true);
        });
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
