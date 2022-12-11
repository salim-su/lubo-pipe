import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService, SettingsService } from '@delon/theme';
import { salimAnimation } from '../../../shared/utils/animate';

@Component({
    selector: 'layout-platform-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less'],
    animations: [salimAnimation],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformFooterComponent implements OnInit, AfterViewInit {
    info = '';
    showBCB = false;
    sel: any;
    selChildren: any;
    menus = [];
    childrenMenu = [];

    constructor(public settings: SettingsService, private router: Router, private menuService: MenuService) {}

    ngOnInit(): void {
        this.menus = this.menuService['data'];
        this.sel = this.menus[0];
    }

    ngAfterViewInit(): void {}

    toggle() {
        this.showBCB = false;
    }

    clickItem(item) {
        if (this.sel['id'] !== item?.id) {
            this.selChildren = '';
        } else {
            if (item.children.length > 0) {
                this.showBCB = !this.showBCB;
                return;
            }
        }
        this.sel = item;
        if (item.children.length > 0) {
            this.showBCB = true;
            this.childrenMenu = item.children;
        } else {
            this.showBCB = false;
            this.router.navigate([item.link], {});
        }
    }

    clickItemChildren(i: any) {
        this.selChildren = i;
        this.showBCB = false;
        this.router.navigate([i.link], {});
    }
}
