import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeptService } from '../dept.service';

@Component({
  selector: 'app-dept-edit',
  templateUrl: './dept-edit.component.html',
  styles: [],
})
export class DeptEditComponent implements OnInit {

  @Input()
  parent = null;
  @Input()
  self = null;
  form: FormGroup;
  dict_orgCategory = [];

  constructor(
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private deptService: DeptService,
  ) {
    this.form = fb.group({
      id: [null],
      parentId: [null],
      fullName: [null, [Validators.required]],
      deptName: [null, [Validators.required]],
      deptCategory: [null, [Validators.required]],
      sort: [null, [Validators.required]],
      remark: [null],
    });
  }

  ngOnInit(): void {
    this.deptService.orgCategory().subscribe((res) => {
      this.dict_orgCategory = res;
    });

    // 新增
    if (this.parent) {
      this.form.patchValue({
        parentId: this.parent.id
      });
    }

    // 编辑
    if (this.self) {
      this.self.deptCategory = this.self.deptCategory && this.self.deptCategory > 0 ? this.self.deptCategory + '' : null;
      this.form.patchValue({
        ...this.self
      });
    }
  }

  close() {
    this.modalRef.close(false);
  }

  saveAndClose() {
    if (!this.validate()) {
      return false;
    }
    const postData = {
      ...this.form.value
    };
    this.deptService.submit(postData).subscribe((res) => {
      this.modalRef.close(true);
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
}
