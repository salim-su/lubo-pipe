import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SYS_SERVER_URL } from '../../../app.config';

@Injectable()
export class PermissionService {
  constructor(private httpClient: _HttpClient) {
  }

  selectAll() {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'permission/selectAll');
  }

  selectPermissionsByRole(roleID) {
    return this.httpClient.get<any>(SYS_SERVER_URL + 'permission/selectPermissionsByRole', { id: roleID });
  }

  delete(id) {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'permission/delete', [id] );
  }

  save(data) {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'permission/save', data);
  }

}
