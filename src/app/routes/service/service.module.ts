import { NgModule } from '@angular/core';
import { AuthService } from './system/auth.service';
import { DictionaryService } from './system/dictionary.service';
import { AccountService } from './system/account.service';
import { OrganService } from './system/organ.service';
import { PermissionService } from './system/permission.service';
import { RoleService } from './system/role.service';
import { AreaService } from './manage/area.service';
import { TypeService } from './manage/type.service';
import { AlarmService } from './manage/alarm.service';
import { FacilityService } from './manage/facility.service';
import { ControlService } from './manage/control.service';
import { SpssService } from './manage/spss.service';
import { HomepageService } from './homepage.service';
import { MonthreportService } from './manage/monthreport.service';
import { DeviceService } from './manage/device.service';
import { FaultService } from './manage/fault.service';
import { StatisticsService } from './manage/statistics.service';

const SYSTEM = [AuthService, DictionaryService, AccountService, OrganService, PermissionService, RoleService];

const MANAGE = [
    DeviceService,
    AreaService,
    TypeService,
    AlarmService,
    FacilityService,
    FaultService,
    ControlService,
    SpssService,
    MonthreportService,
    StatisticsService,
];

@NgModule({
    providers: [HomepageService, ...SYSTEM, ...MANAGE],
})
export class ServiceModule {
    constructor() {}
}
