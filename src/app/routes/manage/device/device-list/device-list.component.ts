import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DeviceService } from '../../../service/manage/device.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.less'],

})
export class DeviceListComponent implements OnInit {
    areaDevicesList = [];
    selectedItem: any;
    form: FormGroup;
    pageInfo = {
        pi: 1,
        ps: 10,
        total: 0,
        loading: false,
    };
    dataList: any;

    constructor(private fb: FormBuilder, private deviceService: DeviceService, private router: Router) {
        this.form = this.fb.group({
            name: new FormControl({ value: '', disabled: false }),
        });
    }
    // _onReuseInit() {
    //     this.ngOnInit();
    // }
    ngOnInit(): void {
        this.loadAreaDevices();
    }

    clickitem(item) {
        this.selectedItem = item;
        this.loadDeviceListByArea();
    }

    loadAreaDevices() {
        this.deviceService.loadAreaDevices().subscribe(res => {
            this.areaDevicesList = res;
            if (this.areaDevicesList.length > 0) {
                this.selectedItem = this.areaDevicesList[0];
                this.loadDeviceListByArea();
            }
        });
    }

    loadDeviceListByArea() {
        const params = {
            current: this.pageInfo.pi,
            size: this.pageInfo.ps,
            name: this.form.value.name,
            areaId: this.selectedItem ? this.selectedItem?.id : '',
        };
        this.pageInfo.loading = true;
        this.deviceService.page(params).subscribe(res => {
            this.dataList = res.records;
            this.pageInfo.total = res.total;
            this.pageInfo.loading = false;
        });
    }

    search() {
        this.loadDeviceListByArea();
    }

    add() {
        this.deviceService.selectItem = this.selectedItem;
        setTimeout(() => {
            this.router.navigate(['/manage/device/edit']);
        }, 100);
    }

    edit(data) {
        this.deviceService.selectItem = this.selectedItem;
        if (data.id) {
            console.log(JSON.stringify(data));
            console.log(JSON.parse(JSON.stringify(data)));
            setTimeout(() => {
                this.router.navigate(['/manage/device/edit', data.id]);
            }, 100);
        }
    }

    remove(data: any) {
        this.deviceService.remove(data.id).subscribe(res => {
            this.loadAreaDevices();
        });
    }
}
