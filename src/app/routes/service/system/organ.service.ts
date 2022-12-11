import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SYS_SERVER_URL } from '../../../app.config';

@Injectable()
export class OrganService {
  constructor(private httpClient: _HttpClient) {
  }

  selectAll() {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'organ/selectAll');
  }

  save(data) {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'organ/save', data);
  }

  delete(id) {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'organ/delete',
      [id]
    );
  }
}
