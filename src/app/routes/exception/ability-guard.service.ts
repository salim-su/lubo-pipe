import { Injectable } from '@angular/core';
import { ACLGuard } from '@delon/acl';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad, Route, Router,
  RouterStateSnapshot, UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MenuService } from '@delon/theme';
import { ArrayService } from '@delon/util';

@Injectable({
  providedIn: 'root',
})
export class AbilityGuardService implements CanActivate, CanActivateChild{

  private allowArray = ['/dashboard', '/exception/403', '/exception/404', '/exception/500'];

  constructor(
    private menu: MenuService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._can(state);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._can(state);
  }

  _can(state: RouterStateSnapshot): Observable<any> {
    return new Observable((x) => {
      if (this.menu.getPathByUrl(state.url).length > 0) {
        x.next(true);
      } else if (this.allowArray.includes(state.url)) {
        x.next(true);
      } else {
        this.router.navigateByUrl('exception/403');
      }
    });
  }
}
