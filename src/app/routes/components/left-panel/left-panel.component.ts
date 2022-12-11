import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { HomepageService } from '../../service/homepage.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import * as moment from 'moment';

@Component({
    selector: 'app-left-panel',
    templateUrl: './left-panel.component.html',
    styleUrls: ['./left-panel.component.less'],
})
export class LeftPanelComponent implements OnInit {
    radioValue = 'day';
    radioValueList = ['day', 'month', 'year'];
    baseInfo: any;

    constructor(private homepageService: HomepageService, private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.loadBaseInfo();
        this.dashboardService.leftPanelFalg.subscribe((res) => {
            /*变化*/
            console.log(res);
        });
        setTimeout((res) => {
            setInterval((res) => {
                this.refreshData();
            }, 300000);
        }, 300000);
    }

    /*概况和状态统计*/
    loadBaseInfo() {
        this.homepageService.loadBaseInfo().subscribe((res) => {
            console.log(res);
            this.baseInfo = res;
        });
    }

    switchSmartSocketTotalNum(item) {
        this.dashboardService.leftPanelFalg.next(false);
        this.dashboardService.showRightPanel.next(false);
        this.dashboardService.deviceType.next(item);
    }

    switchSmartElectricityTotalNum(item) {
        this.dashboardService.leftPanelFalg.next(false);
        this.dashboardService.showRightPanel.next(false);
        this.dashboardService.deviceType.next(item);
    }

    refreshData() {
        // this.chart.clear();
        // this.loadFuHeQuXian('day');
        this.loadBaseInfo();
    }
}
