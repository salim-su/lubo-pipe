import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AuthDictService } from '../service/dict.service';

@Component({
  selector: 'app-auth-dict-edit-root',
  templateUrl: './edit-root.component.html',
})
export class AuthDictEditRootComponent implements OnInit {

  @Input()
  record: any;
  @Input()
  title: string;
  @Input()
  subsystemCode: string;
  @Input()
  dicType: any;

  form: FormGroup;

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    private http: _HttpClient,
    private fb: FormBuilder,
    private dictSrv: AuthDictService,
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [null],
      dictValue: [null, [Validators.required]],
      code: [null, [Validators.required]],
      sort: [null, [Validators.required]],
      remark: [null],
      subsystemCode: this.subsystemCode,
    });

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

    if (this.dicType === 'business') {
      this.dictSrv.submitBiz(data).subscribe(() => {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      });
    } else if (this.dicType === 'system') {
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
