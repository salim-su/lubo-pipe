import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ArrayService } from '@delon/util';
import { map } from 'rxjs/operators';

export interface ListInput {
  code: string;
  name: string;
  subsystemId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthMenuService {
  constructor(private httpClient: _HttpClient, private arraySrv: ArrayService) {
  }

  list(params: ListInput) {
    return this.httpClient.get('blade-system/menu/list', params);
  }

  treeList(params: ListInput) {
    return this.httpClient.get('blade-system/menu/list', params).pipe(
      map(item => {
        // tslint:disable-next-line:no-shadowed-variable
        this.arraySrv.visitTree(item, (item) => {
          item.key = item.id;
          item.title = item.name;
          item.isLeaf = item.children === undefined || item.children.length === 0;
        });
        return item;
      }),
    );
  }

  submit(data) {
    return this.httpClient.post('blade-system/menu/submit', data);
  }

  remove(ids) {
    return this.httpClient.post('blade-system/menu/remove?ids=' + ids);
  }

}
