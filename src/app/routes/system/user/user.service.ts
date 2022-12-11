import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(
    private http: _HttpClient
  ) { }

  page(queryData) {
    return this.http.get('blade-user/page', queryData);
  }

  resetPassword(userId) {
    return this.http.post('blade-user/reset-password', {}, { userIds: userId });
  }

  remove(id) {
    return this.http.post('blade-user/remove', {}, { ids: id });
  }

  saveOrUpdate(postData: any) {
      if (postData.id) {
        return this.http.post('blade-user/update-info', postData);
      } else {
        return this.http.post('blade-user/submit', postData);
      }
  }

  grant(grantData) {
    return this.http.post('blade-user/grant', {}, grantData);
  }
}
