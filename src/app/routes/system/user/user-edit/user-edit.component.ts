import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { RoleService } from '../../role/role.service';
import { UserService } from '../user.service';
import { AuthDictService } from '../../dict/service/dict.service';
import { environment } from '@env/environment';
import { ArrayService } from '@delon/util';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styles: [],
})
export class UserEditComponent implements OnInit {
    @Input()
    dept = null;
    @Input()
    self = null;
    form: FormGroup;
    roleTree = [];
    sexDict = [];
    avatorfileList = [];
    avatorfileListOssid = '';
    link: any;
    @ViewChild('roleTreeSelect', { static: true })
    roleTreeSelect;

    constructor(
        private fb: FormBuilder,
        private modalRef: NzModalRef,
        private roleService: RoleService,
        private userService: UserService,
        private dictService: AuthDictService,
        private aryService: ArrayService,
    ) {
        this.form = fb.group({
            id: [null],
            account: [null, [Validators.required]],
            name: [null, [Validators.required]],
            roleId: [null, [Validators.required]],
            deptId: [null, [Validators.required]],
            realName: [null],
            email: [null],
            phone: [null],
            birthday: [null],
            sex: [null],
            userType: [1],
        });
    }

    ngOnInit(): void {
        this.dictService.dictionary(environment.dict.sex).subscribe((res) => {
            this.sexDict = res;
        });
        this.roleService.list(null).subscribe((res) => {
            this.roleTree = res;
        });

        // 新增
        if (this.dept) {
            this.form.patchValue({
                deptId: this.dept.id,
            });
        }

        // 编辑
        if (this.self) {
            console.log(this.self);
            this.link = this.self.avatar;

            // this.avatorfileListOssid = this.record.idCardOssIds;
            const formData = {
                ...this.self,
                roleId: this.self.roleId.split(','),
                sex: this.self.sex && this.self.sex > 0 ? this.self.sex + '' : null,
            };
            this.form.patchValue(formData);
            this.form.get('account').disable({ onlySelf: true });
        }
    }

    close() {
        this.modalRef.close(false);
    }

    saveAndClose() {
        if (!this.validate()) {
            return false;
        }

        let birthday = null;
        if (this.form.value.birthday) {
            birthday = new Date(this.form.value.birthday).getTime();
        }

        const roleIds = [];
        this.aryService.visitTree(this.roleTreeSelect.getCheckedNodeList(), (item) => {
            roleIds.push(item.key);
        });

        const postData = {
            ...this.form.value,
            roleId: roleIds.join(','),
            avatar: this.avatorfileList.map((i) => i.link).join(','),
            birthday,
        };
        console.log(postData);

        this.userService.saveOrUpdate(postData).subscribe((res) => {
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
