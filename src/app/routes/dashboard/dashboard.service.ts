import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { _HttpClient } from '@delon/theme';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    flag = false;
    leftPanelFalg = new Subject<boolean>();
    showRightPanel = new Subject<boolean>();
    showRightPanelDetails = false;
    deviceType = new Subject<string>();
    getMap = new Subject<any>();

    constructor(private httpClient: _HttpClient) {}
    baseInfo() {
        return this.httpClient.get('pipe/home/baseInfo');
    }

    alarmPage(params) {
        return this.httpClient.get('pipe/alarm/page', params);
    }
}
