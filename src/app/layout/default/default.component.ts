import { Component, ComponentFactoryResolver, ElementRef, HostBinding, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'layout-default-qx',
    templateUrl: './default.component.html',
})
export class LayoutDefaultQxComponent implements OnInit {

    @HostBinding('class.alain-default') alainDefault = true;

    constructor(
        router: Router,
        _message: NzMessageService,
        private resolver: ComponentFactoryResolver,
        private settings: SettingsService,
        private el: ElementRef,
        private renderer: Renderer2,
        @Inject(DOCUMENT) private doc: any,
    ) {
    }

    ngOnInit() {
    }
}
