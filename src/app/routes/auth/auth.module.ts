import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@shared';
import { ComponentsModule } from '../../shared/components/components.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];


@NgModule({
    declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule,
        ComponentsModule,
    ],
    entryComponents: COMPONENTS_NOROUNT,
})
export class AuthModule {
}
