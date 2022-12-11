import { Component } from '@angular/core';

@Component({
  selector: 'layout-blank',
  template: `<layout-platform-header class="alain-default__header pr0 dn"></layout-platform-header><router-outlet></router-outlet> `,
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.alain-blank]': 'true',
  },
})
export class LayoutBlankComponent {}
