import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthMenuService } from '../service/menu.service';

@Component({
    selector: 'app-auth-menu-edit',
    templateUrl: './edit.component.html',
})
export class AuthMenuEditComponent implements OnInit {

    @Input()
    record: any = {};

    menus = [];
    form: FormGroup;

    constructor(
        public drawer: NzDrawerRef,
        private msgSrv: NzMessageService,
        private http: _HttpClient,
        private fb: FormBuilder,
        private menuService: AuthMenuService,
    ) {
        this.form = this.fb.group({
            id: [null],
            name: [null, [Validators.required]],
            path: [null],
            source: [null, [Validators.required]],
            code: [null, [Validators.required]],
            sort: [null, [Validators.required]],
            category: ['1', [Validators.required]],
            parentId: [null],
            subsystemId: [null, [Validators.required]],
            remark: [null],
        });
    }

    ngOnInit(): void {
        this.loadMenus(this.record.subsystemId);
        if (this.record.hasOwnProperty('category')) {
            this.record.category = this.record.category + '';
        }
        this.form.patchValue(this.record);
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

    saveAndClose() {
        const isValid = this.validate();
        if (!isValid) {
            return;
        }
        if (this.form.value.parentId == null) {
            this.form.value.parentId = 0;
        }
        this.menuService.submit(this.form.value).subscribe(() => {
          this.drawer.close();
        });
    }

    saveAndContinue() {
        const isValid = this.validate();
        if (!isValid) {
            return;
        }
        if (this.form.value.parentId === null) {
            this.form.value.parentId = '';
        }
        this.menuService.submit(this.form.value).subscribe(data => {
            this.form.patchValue({
                name: null,
                path: null,
                source: null,
                code: null,
                sort: null,
                remark: null,
            });
            this.loadMenus(this.form.value.subsystemId);
        });
    }

    loadMenus(subsystemId) {
        const params = {
            code: '',
            subsystemId,
            name: '',
        };
        this.menuService.treeList(params).subscribe(data => {
            this.menus = data;
        });

    }

    close() {
        this.drawer.close();
    }
}
