import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlarmListComponent } from './alarm/alarm-list/alarm-list.component';
import { AlarmProssComponent } from './alarm/alarm-pross/alarm-pross.component';
import { AlarmCheckComponent } from './alarm/alarm-check/alarm-check.component';
import { SharedModule } from '@shared';
import { ComponentsModule } from '../../shared/components/components.module';
import { FaultListComponent } from './fault/fault-list/fault-list.component';
import { FaultCheckComponent } from './fault/fault-check/fault-check.component';
import { FaultProssComponent } from './fault/fault-pross/fault-pross.component';
import { ManageRoutingModule } from './manage-routing.module';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { DeviceEditComponent } from './device/device-edit/device-edit.component';
import { AreaListComponent } from './area/area-list/area-list.component';
import { AreaEditComponent } from './area/area-edit/area-edit.component';
import { LocateListComponent } from './locate/locate-list/locate-list.component';
import { AlarmSpssListComponent } from './spss/alarm-spss/alarm-spss-list.component';
import { ElectricitySpssComponent } from './spss/electricity-spss/electricity-spss.component';
import { OutletSpssComponent } from './spss/outlet-spss/outlet-spss.component';
import { WaterSpssComponent } from './spss/water-spss/water-spss.component';
import { ReportWaterComponent } from './report/water/water.component';
import { ReportEnergyComponent } from './report/energy/energy.component';
import { BdsComponent } from './report/bds/bds.component';
import { PhotovoltaicComponent } from './report/photovoltaic/photovoltaic.component';

const COMPONENTS = [
    AlarmListComponent,
    FaultListComponent,
    AlarmSpssListComponent,
    DeviceListComponent,
    DeviceEditComponent,
    AreaListComponent,
    LocateListComponent,
    OutletSpssComponent,
    WaterSpssComponent,
    ElectricitySpssComponent,
    ReportWaterComponent,
    ReportEnergyComponent,
    BdsComponent,
    PhotovoltaicComponent,
];
const COMPONENTS_NOROUNT = [AlarmProssComponent, AlarmCheckComponent, FaultCheckComponent, FaultProssComponent, AreaEditComponent];

@NgModule({
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    imports: [CommonModule, ManageRoutingModule, SharedModule, ComponentsModule],
    entryComponents: [COMPONENTS_NOROUNT, COMPONENTS],
})
export class ManageModule {}
