import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AreaService } from '../../../service/manage/area.service';

@Component({
    selector: 'app-area-edit',
    templateUrl: './area-edit.component.html',
    styleUrls: ['./area-edit.component.less'],
})
export class AreaEditComponent implements OnInit {
    form: FormGroup;
    @Input() record;

    constructor(private fb: FormBuilder, private nzModalRef: NzModalRef, private areaService: AreaService) {
        this.form = this.fb.group({
            name: [null, [Validators.required, Validators.maxLength(100)]],
            linkman: this.fb.array([
                this.fb.group({
                    personName: [null, [Validators.required]],
                    phoneNumber: [null, [Validators.required, Validators.pattern('^1[3|4|5|7|8][0-9]{9}$')]],
                }),
            ]),
        });
    }

    ngOnInit(): void {
        /**
         * 编辑带入原数据
         */
        if (this.record) {
            for (let i = 1; i < this.record.linkman.length; i++) {
                this.linkman.push(
                    this.fb.group({
                        personName: [null, [Validators.required]],
                        phoneNumber: [null, [Validators.required, Validators.pattern('^1[3|4|5|7|8][0-9]{9}$')]],
                    }),
                );
            }
            this.form.patchValue(this.record);
        }
    }

    submit() {
        const formValid = this.validate();
        if (!formValid) {
            return;
        }
        console.log(this.form.value);
        if (this.record) {
            const data = this.form.value;
            data.id = this.record.id;
            this.areaService.submit(data).subscribe(res => {
                this.nzModalRef.close(data);
            });
        } else {

            const data = this.form.value;
            this.areaService.submit(data).subscribe(res => {
                this.nzModalRef.close(data);
            });
        }
    }

    cancel() {
        this.nzModalRef.close();
    }

    get linkman() {
        return this.form.get('linkman') as FormArray;
    }

    public addStage(): void {
        this.linkman.push(
            this.fb.group({
                personName: [null, [Validators.required]],
                phoneNumber: [null, [Validators.required, Validators.pattern('^1[3|4|5|7|8][0-9]{9}$')]],
            }),
        );
    }

    public removeStage(formIndex: number): void {
        this.linkman.removeAt(formIndex);
    }


    validate() {
        for (const key in this.form.controls) {
            if (this.form.controls.hasOwnProperty(key)) {
                const element = this.form.controls[key];
                if (element.hasOwnProperty('controls')) {
                    element['controls'].forEach(res => {
                        for (const keyFormArray in res.controls) {
                            if (res.controls.hasOwnProperty(keyFormArray)) {
                                const elementFormArray = res.controls[keyFormArray];
                                elementFormArray.markAsDirty();
                                elementFormArray.updateValueAndValidity();
                            }
                        }
                    });
                } else {
                    element.markAsDirty();
                    element.updateValueAndValidity();
                }
            }
        }
        return this.form.valid;
    }
}
