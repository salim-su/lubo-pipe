import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DeviceService } from '../../../service/manage/device.service';

@Component({
    selector: 'app-locate-list',
    templateUrl: './locate-list.component.html',
    styleUrls: ['./locate-list.component.less'],
})
export class LocateListComponent implements OnInit, AfterViewInit {
    deviceList = [];
    selectedItem: any;
    selLis = [
        {
            name: '智慧用电',
            deviceCategoryId: '1',
        },
        {
            name: '智能插座',
            deviceCategoryId: '2',
        },
        {
            name: '智能水表',
            deviceCategoryId: '3',
        },
    ];
    selDevice: any;
    @ViewChild('iframe') iframeRef: ElementRef;

    constructor(private deviceService: DeviceService) {}

    ngOnInit(): void {
        this.selDevice = this.selLis[0];
    }

    clickItem(item) {
        this.selectedItem = item;
        this.loadLocate();
    }

    ngAfterViewInit(): void {
        this.iframeRef.nativeElement.onload = () => {
            this.loadDevices(this.selDevice.deviceCategoryId);
        };
    }

    loadDevices(deviceCategoryId) {
        this.deviceService.list({ deviceCategoryId }).subscribe((res) => {
            this.deviceList = res;
            res.forEach((item) => {
                item.threeDInfo = JSON.parse(item.threeDInfo);
            });
            this.selectedItem = res[0];
            this.loadLocate();
        });
    }

    loadLocate() {
        console.log(this.selectedItem.threeDInfo);
        if (this.selectedItem.threeDInfo === null) {
            return;
        }
        const message = {
            funcName: 'locateDevice',
            param: this.selectedItem.threeDInfo,
        };
        this.iframeRef.nativeElement.contentWindow.postMessage(message, '*');
    }

    saveLocate(params) {
        if (this.selectedItem === undefined) {
            return;
        }
        const data = {
            id: this.selectedItem.id,
            threeDInfo: params,
        };
        this.deviceService.updateThreeDInfo(data).subscribe((res) => {
            this.selectedItem.threeDInfo = params;
        });
        console.log('saveLocate-----------');
        console.log(params);
        console.log(this.selectedItem);
    }

    @HostListener('window:message', ['$event'])
    onMessage(event) {
        const data = event.data;
        if (data.funcName === undefined) {
            return;
        }
        const funcName = data.funcName;
        const param = data.param;
        this[funcName](param);
    }

    changeDevice(deviceCategoryId) {
        this.loadDevices(deviceCategoryId);
    }
}
