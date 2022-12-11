import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'layout-platform-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlatformHeaderComponent implements OnInit, AfterViewInit {
  searchToggleStatus: boolean;
  carouseInfoItem = '';
  carouseInfo = [];
  info = '';

  constructor(public settings: SettingsService, private router: Router,) {
  }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }

  goToPlatform() {
    // window.location.href = environment.platformDashboardURL;
  }

  loadCarouseInfo() {
    const params = {
      current: 1,
      size: 100,
      subsystemCode: 'traffic',
      status: 1,
    };
    // this.dashboardCarouselManageService.page(params).subscribe(res => {
    //   console.log(res);
    //   this.carouseInfo = res.records;
    //   // this.bofang(this.carouseInfo);
    //   // console.log(this.carouseInfo[0].content);
    //
    //   this.info = this.carouseInfo[0].content;
    //
    //   console.log(this.info);
    // });
  }

  bofang(arr) {


    if (arr.length > 0) {
      this.carouseInfoItem = arr[0].content;
      console.log(arr);
      let num = 1;
      setInterval(res => {
        if (num == arr.length) {
          num = 0;
        }
        this.carouseInfoItem = arr[num].content;
        num++;
      }, 3000);
    }
  }

  ngOnInit(): void {
    // this.loadCarouseInfo();
  }

  ngAfterViewInit(): void {
    this.loadCarouseInfo();
  }
}
