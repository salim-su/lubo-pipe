import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SYS_SERVER_URL } from '../../../app.config';

@Injectable()
export class AccountService {
  constructor(private httpClient: _HttpClient) {
  }
  queryPagedUsers(rows, page, queryParams) {
    const postData = Object.assign(queryParams, {
      rows, page,
    });
    return this.httpClient.post<any>(SYS_SERVER_URL + 'account/selectPage', postData);
  }
  getById(id) {
    return this.httpClient.get<any>(SYS_SERVER_URL + 'account/getById', { id });
  }
  save(data) {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'account/save', data);
  }

  delete(id) {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'account/delete', [id]);
  }
}
