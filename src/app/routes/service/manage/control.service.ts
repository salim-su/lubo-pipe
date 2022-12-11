import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { BASE_SERVER_URL } from '../../../app.config';

@Injectable()
export class ControlService {

  constructor(private httpClient: _HttpClient) { }


    openRelay(id) {
        return this.httpClient.post<any>(BASE_SERVER_URL + 'electricity/device/openRelay',{id:id});
    }

    closeRelay(id) {
        return this.httpClient.get<any>(BASE_SERVER_URL + 'electricity/device/closeRelay',{id:id});
    }
}
