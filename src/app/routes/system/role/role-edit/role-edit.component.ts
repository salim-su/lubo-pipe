import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../role.service';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styles: [],
})
export class RoleEditComponent implements OnInit {

  @Input()
  parent = null;
  @Input()
  self = null;

  form: FormGroup;

  constructor(
    private service: RoleService,
    private fb: FormBuilder,
    private modalRef: NzModalRef
  ) {
    this.form = fb.group({
      id: [null],
      sort: [null, [Validators.required]],
      parentId: [null],
      roleName: [null, [Validators.required]],
      roleAlias: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    // 新增
    if (this.parent) {
      this.form.patchValue({
        parentId: this.parent.id,
      });
    }

    // 编辑
    if (this.self) {
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
    this.service.submit(postData).subscribe((res) => {
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
