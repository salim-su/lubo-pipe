import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { SYS_SERVER_URL } from '../../../app.config';

@Injectable()
export class DictionaryService {
  constructor(private httpClient: _HttpClient) {

  }

  selectAllCategory() {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'dictionary/selectAllCategory');
  }

  selectAllDictionary(queryParams) {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'dictionary/selectAllDictionary', queryParams);
  }

  delete(id) {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'dictionary/delete', [id]);
  }

  save(data) {
    return this.httpClient.post<any>(SYS_SERVER_URL + 'dictionary/save', data);
  }
}
