import { Inject, Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { BASE_SERVER_URL, SYS_SERVER_URL } from '../../../app.config';

@Injectable()
export class AuthService {
    authInfo = {
        token: '',
        account: '',
        userName: '',
        authority: '',
        tokenType: '',
    };

    constructor(private httpClient: _HttpClient) {
    }

    login(username, password): Observable<any> {
        const headers = new HttpHeaders({ Authorization: 'Basic d2F0ZXI6d2F0ZXJfc2VjcmV0' });
        return this.httpClient.post(BASE_SERVER_URL + 'blade-auth/login', {}, { username, password }, { headers });
    }

    // 获取授权信息
    getAuthInfo() {
        return this.httpClient.get<any>(SYS_SERVER_URL + 'account/getAuthInfo');
    }

    /*修改密码*/
    changePw(data) {
        return this.httpClient.post<any>(SYS_SERVER_URL + 'account/updatePassword', data);
    }
}
