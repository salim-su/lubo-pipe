import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SUploadComponent } from './s-upload/s-upload.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { SHARED_DELON_MODULES } from '../shared-delon.module';
import { SHARED_ZORRO_MODULES } from '../shared-zorro.module';
import { AlainThemeModule } from '@delon/theme';
import { SharedModule } from '@shared';

@NgModule({
    declarations: [SUploadComponent],
    exports: [
        SUploadComponent,

    ],
    imports: [
        CommonModule,
        SharedModule,
        NzUploadModule,
        ...SHARED_DELON_MODULES,
        ...SHARED_ZORRO_MODULES,
        AlainThemeModule.forChild(),
    ],
})
export class ComponentsModule { }
