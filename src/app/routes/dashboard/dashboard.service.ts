import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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
    constructor() {}
}
