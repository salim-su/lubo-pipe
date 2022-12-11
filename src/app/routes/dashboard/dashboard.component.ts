import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {salimAnimation} from '../../shared/utils/animate';
import {DeviceService} from '../service/manage/device.service';
import {DashboardService} from './dashboard.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {DeptEditComponent} from '../system/dept/dept-edit/dept-edit.component';
import {ModalDashboardComponent} from './modal-dashboard/modal-dashboard.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    animations: [salimAnimation],
    // styleUrls: ['./dashboard.component.less'],
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
    @ViewChild('iframe') iframeRefs: ElementRef;
    showLeftPanel = true;
    showRightPanel = true;
    deviceList = [];
    selectedItem: any;
    deviceLatestData: '';
    truckLatestData: '';
    jsonData: any;
    flg: string;

    constructor(
        private deviceService: DeviceService,
        public dashboardService: DashboardService,
        private modalService: NzModalService,
    ) {
    }

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
        this.dashboardService.deviceType.subscribe((res) => {
            this.flg = res;
            this.deviceService.list({deviceCategoryId: res}).subscribe((e) => {
                this.deviceList = e;
                e.forEach((item) => {
                    item.threeDInfo = JSON.parse(item.threeDInfo);
                });
                // this.selectedItem = e[0];
                // this.loadDeviceLatestData(this.selectedItem.no);
            });
        });
    }

    modaltest(params) {
        this.modalService.create({
            nzContent: ModalDashboardComponent,
            nzComponentParams: {
                params
            },
            nzStyle: {top: '150px'},
            nzWidth: '985px',
            nzWrapClassName: 'modal-dashboard',
            nzTitle: '新增',
            nzFooter: null,
        }).afterClose.subscribe((res) => {
        });
    }

    postmessage() {
        this.dashboardService.leftPanelFalg.next(true);
        this.dashboardService.showRightPanel.next(true);
    }

    clickitem(item) {
        this.selectedItem = item;
        this.dashboardService.showRightPanelDetails = true;
        if (item.deviceCategoryId === '8') {
            this.loadTruckLatestData(this.selectedItem.no);
        } else {
            this.loadDeviceLatestData(this.selectedItem.no);
            this.loadLocate();
        }
    }

    loadPhotovoltaicMarker() {
        this.deviceService.deviceLatestData({deviceNo: '0869334052167254'}).subscribe((res) => {
            if (res['jsonData']) {
                const photovoltaicJsonData = JSON.parse(this.deviceLatestData['jsonData']);
                console.log(photovoltaicJsonData);
            }
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
        this.iframeRefs.nativeElement.contentWindow.postMessage(message, '*');
    }

    loadDeviceLatestData(no) {
        this.deviceService.deviceLatestData({deviceNo: no}).subscribe((res) => {
            this.deviceLatestData = res;
            if (res['jsonData']) {
                this.jsonData = JSON.parse(this.deviceLatestData['jsonData']);
                console.log(this.jsonData);
            } else {
                this.jsonData = {};
            }
        });
    }

    loadTruckLatestData(no) {
        this.deviceService.truckLatestData({deviceNo: no}).subscribe((res) => {
            this.truckLatestData = res;
            const setting = JSON.parse(res.setting);
            if (this.truckLatestData['latestTemperature']) {
                this.jsonData = JSON.parse(this.truckLatestData['latestTemperature']);
            } else {
                this.jsonData = {};
            }
            const param = {
                device_no: no,
                lat: res.latitude,
                lng: res.longitude,
            };
            if (setting.modelId) {
                param['modelId'] = setting.modelId;
            }
            console.log(param);
            const message = {
                funcName: 'loadTruck',
                param,
            };
            this.iframeRefs.nativeElement.contentWindow.postMessage(message, '*');
        });
    }

    return() {
        this.selectedItem = '';
        this.dashboardService.showRightPanelDetails = false;
        this.dashboardService.leftPanelFalg.next(true);
        this.dashboardService.showRightPanel.next(true);
    }


}
