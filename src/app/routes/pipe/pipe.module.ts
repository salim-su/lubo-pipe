import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipeRoutingModule } from './pipe-routing.module';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { LocateListComponent } from './locate/locate-list/locate-list.component';
import { StatisticsListComponent } from './statistics/statistics-list/statistics-list.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '../../shared/components/components.module';
import { PipeAlarmListComponent } from './alarm/pipe-alarm-list/pipe-alarm-list.component';
import {DeviceEditComponent} from './device/device-edit/device-edit.component';

@NgModule({
    declarations: [DeviceListComponent, LocateListComponent, StatisticsListComponent, PipeAlarmListComponent,DeviceEditComponent],
    imports: [CommonModule, PipeRoutingModule, SharedModule, ComponentsModule],
})
export class PipeModule {}
