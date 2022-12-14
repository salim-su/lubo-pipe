import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { LocateListComponent } from './locate/locate-list/locate-list.component';
import { StatisticsListComponent } from './statistics/statistics-list/statistics-list.component';
import { PipeAlarmListComponent } from './alarm/pipe-alarm-list/pipe-alarm-list.component';
import {DeviceEditComponent} from './device/device-edit/device-edit.component';

const routes: Routes = [
    { path: 'alarm', component: PipeAlarmListComponent },
    { path: 'device', component: DeviceListComponent },
    { path: 'device/edit', component: DeviceEditComponent },
    { path: 'device/edit/:selfid', component: DeviceEditComponent },
    { path: 'locate', component: LocateListComponent },
    { path: 'statistics', component: StatisticsListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PipeRoutingModule {}
