import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AlainThemeModule } from '@delon/theme';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { SHARED_DELON_MODULES } from './shared-delon.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';
import { AlarmPipe } from '../routes/pips/alarm.pipe';
import { FaultPipe } from '../routes/pips/fault.pipe';
import { FiltratePipe } from '../routes/pips/filtrate.pipe';
import { FiltrateAlarmPipe } from '../routes/pips/filtrate-alarm.pipe';

// #region third libs

const THIRDMODULES: Type<any>[] = [];

// #endregion

// #region your componets & directives

const COMPONENTS: Type<any>[] = [AlarmPipe, FaultPipe, FiltratePipe, FiltrateAlarmPipe];
const DIRECTIVES: Type<any>[] = [];

// #endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        AlainThemeModule.forChild(),
        DelonACLModule,
        DelonFormModule,
        ...SHARED_DELON_MODULES,
        ...SHARED_ZORRO_MODULES,
        // third libs
        ...THIRDMODULES,
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AlainThemeModule,
        DelonACLModule,
        DelonFormModule,
        ...SHARED_DELON_MODULES,
        ...SHARED_ZORRO_MODULES,
        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
})
export class SharedModule {
}
