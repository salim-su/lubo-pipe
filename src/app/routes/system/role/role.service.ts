import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ArrayService } from '@delon/util';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  constructor(
    private http: _HttpClient,
    private aryService: ArrayService
  ) {
  }

  list(params) {
    return this.http.get('blade-system/role/list', params).pipe(
      map((item) => {
        this.aryService.visitTree(item, (jtem) => {
          jtem['key'] = jtem.id;
          jtem['title'] = jtem.roleName;
          jtem['isLeaf'] = !jtem.hasOwnProperty('children');
        });
        return item;
      })
    );
  }

  submit(postData: any) {
    return this.http.post('blade-system/role/submit', postData);
  }

  remove(id) {
    return this.http.post('blade-system/role/remove', {}, { ids: id });
  }


  treeMenu() {
    return this.http.get('blade-system/menu/menu-list');
  }

  treeSubsystemMenu() {
    return this.http.get('blade-system/menu/tree-subsystem-menu').pipe(
      map(item => {
        this.aryService.visitTree(item, (jtem) => {
          jtem['key'] = jtem.id;
          jtem['title'] = jtem.name;
          jtem['isLeaf'] = !jtem.hasOwnProperty('children');
        });
        return item;
      }),
    );
  }

  menuKeysByRole(roleId) {
    return this.http.get('blade-system/menu/role-tree-keys', { roleIds: roleId });
  }

  grant(grantData) {
    return this.http.post('blade-system/role/grant', grantData);
  }
}
