import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SYS_SERVER_URL } from '../../../app.config';

@Injectable()
export class RoleService {
  constructor(private httpClient: _HttpClient) {

  }

  selectAll() {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'role/selectAll');
  }

  save(data) {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'role/save', data);
  }

  delete(id) {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'role/delete', [id]);
  }
}
