import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {zip} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';
import {PipeService} from '../../pipe.service';

@Component({
    selector: 'app-device-edit',
    templateUrl: './device-edit.component.html',
    styleUrls: ['./device-edit.component.less'],
})
export class DeviceEditComponent implements OnInit {
    selfid = '';
    form: FormGroup;

    deviceType = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private msgSrv: NzMessageService,
        private pipeService: PipeService
    ) {
        this.form = this.fb.group({
            id: new FormControl({value: null, disabled: false}), // 短信报警
            name: new FormControl({value: null, disabled: false}, [Validators.required, Validators.maxLength(100)]), // 设备名称
            no: new FormControl({value: null, disabled: false}, [Validators.required, Validators.maxLength(100)]), // 设备编号
            deviceCategoryId: new FormControl({value: null, disabled: false}, Validators.required), // 设备类别ID
        });
    }

    ngOnInit(): void {

        this.pipeService.deviceCategoryList().subscribe(res => {
            this.deviceType = res;
            console.log(this.deviceType);
        });

        this.selfid = this.activatedRoute.snapshot.params['selfid'];
        console.log(this.selfid);
        if (this.selfid) {
            this.pipeService.loadDeviceInfoById(this.selfid).subscribe((res) => {
                const formInfo = res;
                this.form.patchValue(formInfo);
            });
        }

    }


    onSubmit() {
        const isValid = this.validate();
        if (!isValid) {
            return;
        }
        const formInfo = this.form.value;

        this.pipeService.submit(formInfo).subscribe((res) => {
            this.msgSrv.success('保存成功');
            this.router.navigate(['/pipe/device']);
        });
    }

    cancel() {
        setTimeout(() => {
            this.router.navigate(['/pipe/device']);
        }, 500);
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
