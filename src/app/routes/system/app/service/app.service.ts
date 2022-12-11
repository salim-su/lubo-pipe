import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class AuthAppService {
    constructor(private httpClient: _HttpClient) {
    }


    page(params) {
        return this.httpClient.get('blade-system/subsystem/page', params);
    }

    submit(data) {
        return this.httpClient.post('blade-system/subsystem/submit', data);
    }

    remove(ids: string) {
        return this.httpClient.post('blade-system/subsystem/remove?ids=' + ids);
    }

    list(params) {
        return this.httpClient.get('blade-system/subsystem/list', params);
    }
}
