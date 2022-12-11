import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@env/environment';
import { DeviceService } from '../../../service/manage/device.service';
import { zip } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-device-edit',
    templateUrl: './device-edit.component.html',
    styleUrls: ['./device-edit.component.less'],
})
export class DeviceEditComponent implements OnInit {
    selfid = '';
    form: FormGroup;
    typeInfo: any = [
        {
            id: '1',
            name: '1',
        },
    ];
    areaInfo: any = [
        {
            id: '1',
            name: '1',
        },
    ];
    msgOption = [
        {
            label: '短信通知',
            checked: false,
        },
    ];
    voiceOption = [
        {
            label: '语音电话',
            checked: false,
        },
    ];
    yesNo = environment.dict.yesNo;
    deviceArea = [];
    deviceType = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private deviceService: DeviceService,
        private msgSrv: NzMessageService,
    ) {
        this.form = this.fb.group({
            id: new FormControl({ value: null, disabled: false }), // 短信报警
            name: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.maxLength(100)]), // 设备名称
            no: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.maxLength(100)]), // 设备编号
            deviceCategoryId: new FormControl({ value: null, disabled: false }, Validators.required), // 设备类别ID
            areaId: new FormControl({ value: null, disabled: false }, Validators.required), // 区域ID
            isCallPhone: new FormControl({ value: null, disabled: false }, Validators.required), // 电话报警
            isSendSms: new FormControl({ value: null, disabled: false }, Validators.required), // 短信报警
            installLocation: new FormControl(
                {
                    value: null,
                    disabled: false,
                },
                [Validators.required, Validators.maxLength(100)],
            ), // 设备所在位置
            isMonitor: new FormControl({ value: null, disabled: false }), // 是否监控
            gaodeLat: new FormControl({ value: null, disabled: false }), // 高德经度
            gaodeLng: new FormControl({ value: null, disabled: false }), // 高德纬度
            ratio: new FormControl({ value: null, disabled: false }), // 变比
            displayOrder: new FormControl({ value: null, disabled: false }),
            setting: new FormControl({ value: null, disabled: false }), // 配置
        });
    }

    ngOnInit(): void {
        this.loadDic();
        this.selfid = this.activatedRoute.snapshot.params['selfid'];
        console.log(this.selfid);
        this.deviceService.loadDeviceInfoById(this.selfid).subscribe((res) => {
            const formInfo = res;
            if (res.isCallPhone === 1) {
                formInfo.isCallPhone = [
                    {
                        label: '语音电话',
                        checked: true,
                    },
                ];
            } else {
                formInfo.isCallPhone = [
                    {
                        label: '语音电话',
                        checked: false,
                    },
                ];
            }

            if (res.isSendSms === 1) {
                formInfo.isSendSms = [
                    {
                        label: '短信通知',
                        checked: true,
                    },
                ];
            } else {
                formInfo.isSendSms = [
                    {
                        label: '短信通知',
                        checked: false,
                    },
                ];
            }
            this.form.patchValue(formInfo);
        });
    }

    loadDic() {
        zip(this.deviceService.loadDicDeviceArea(), this.deviceService.loadDicDeviceType()).subscribe(([deviceArea, deviceType]) => {
            this.deviceArea = deviceArea;
            this.deviceType = deviceType;
        });
    }

    onSubmit() {
        const isValid = this.validate();
        if (!isValid) {
            return;
        }
        const formInfo = this.form.value;
        if (formInfo.isCallPhone) {
            formInfo.isCallPhone[0].checked === true ? (formInfo.isCallPhone = 1) : (formInfo.isCallPhone = 0);
        }
        if (formInfo.isSendSms) {
            formInfo.isSendSms[0].checked === true ? (formInfo.isSendSms = 1) : (formInfo.isSendSms = 0);
        }
        this.deviceService.submit(formInfo).subscribe((res) => {
            this.msgSrv.success('保存成功');
            this.router.navigate(['/manage/device/list']);
        });
    }

    cancel() {
        setTimeout(() => {
            this.router.navigate(['/manage/device/list']);
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
