import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { salimAnimation } from '../../shared/utils/animate';
import { DashboardService } from './dashboard.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalDashboardComponent } from './modal-dashboard/modal-dashboard.component';

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

    dashboardInfo: any;
    alarmList: any;
    pageInfo = {
        pi: 1,
        ps: 10,
        total: 0,
        loading: false,
    };
    constructor( public dashboardService: DashboardService, private modalService: NzModalService) {}

    ngAfterViewInit(): void {}

    ngOnInit(): void {
        this.dashboardService.baseInfo().subscribe((res) => {
            console.log(res);
            this.dashboardInfo = res;
        });
        const params = {
            current: this.pageInfo.pi,
            size: this.pageInfo.ps,
        };
        this.dashboardService.alarmPage(params).subscribe((res) => {
            console.log(res);
            this.alarmList = res?.records;
        });

    }

    modaltest(params) {
        this.modalService
            .create({
                nzContent: ModalDashboardComponent,
                nzComponentParams: {
                    params,
                },
                nzStyle: { top: '150px' },
                nzWidth: '985px',
                nzWrapClassName: 'modal-dashboard',
                nzTitle: '新增',
                nzFooter: null,
            })
            .afterClose.subscribe((res) => {});
    }

    postmessage() {
        this.dashboardService.leftPanelFalg.next(true);
        this.dashboardService.showRightPanel.next(true);
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

    return() {
        this.selectedItem = '';
        this.dashboardService.showRightPanelDetails = false;
        this.dashboardService.leftPanelFalg.next(true);
        this.dashboardService.showRightPanel.next(true);
    }
}
