import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlarmListComponent } from '../manage/alarm/alarm-list/alarm-list.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { LocateListComponent } from './locate/locate-list/locate-list.component';
import { StatisticsListComponent } from './statistics/statistics-list/statistics-list.component';
import { PipeAlarmListComponent } from './alarm/pipe-alarm-list/pipe-alarm-list.component';

const routes: Routes = [
    { path: 'alarm', component: PipeAlarmListComponent },
    { path: 'device', component: DeviceListComponent },
    { path: 'locate', component: LocateListComponent },
    { path: 'statistics', component: StatisticsListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PipeRoutingModule {}
