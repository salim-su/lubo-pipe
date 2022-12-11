import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmListComponent } from './alarm/alarm-list/alarm-list.component';
import { FaultListComponent } from './fault/fault-list/fault-list.component';
import { DeviceListComponent } from './device/device-list/device-list.component';
import { DeviceEditComponent } from './device/device-edit/device-edit.component';
import { AreaListComponent } from './area/area-list/area-list.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LocateListComponent } from './locate/locate-list/locate-list.component';
import { AlarmSpssListComponent } from './spss/alarm-spss/alarm-spss-list.component';
import { ElectricitySpssComponent } from './spss/electricity-spss/electricity-spss.component';
import { OutletSpssComponent } from './spss/outlet-spss/outlet-spss.component';
import { WaterSpssComponent } from './spss/water-spss/water-spss.component';
import { ReportEnergyComponent } from './report/energy/energy.component';
import { ReportWaterComponent } from './report/water/water.component';
import { BdsComponent } from './report/bds/bds.component';
import { PhotovoltaicComponent } from './report/photovoltaic/photovoltaic.component';

const routes: Routes = [
    { path: 'alarm/list', component: AlarmListComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'fault/list', component: FaultListComponent },
    { path: 'alarm-spss/list', component: AlarmSpssListComponent },
    { path: 'electricity-spss/list', component: ElectricitySpssComponent },
    { path: 'outlet-spss/list', component: OutletSpssComponent },
    { path: 'water-spss/list', component: WaterSpssComponent },
    { path: 'device/list', component: DeviceListComponent },
    { path: 'area/list', component: AreaListComponent },
    { path: 'locate/list', component: LocateListComponent },
    {
        path: 'device/edit',
        component: DeviceEditComponent,
    },
    {
        path: 'device/edit/:selfid',
        component: DeviceEditComponent,
    },
    {
        path: 'report/energy',
        component: ReportEnergyComponent,
    },
    {
        path: 'report/water',
        component: ReportWaterComponent,
    },
    { path: 'report/bds', component: BdsComponent, data: { deviceCategoryId: '4,7' } },
    { path: 'report/cq', component: BdsComponent, data: { deviceCategoryId: 6 } },
    { path: 'report/photovoltaic', component: PhotovoltaicComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageRoutingModule {}
