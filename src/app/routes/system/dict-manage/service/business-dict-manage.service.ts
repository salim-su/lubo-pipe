import { _HttpClient } from '@delon/theme';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BusinessDictManageService {
    constructor(
        private httpClient: _HttpClient,
    ) {
    }

    list(params) {
        return this.httpClient.get('qx/blade-system/dict/list', params).pipe(
            map(item => {
                return item[0].children;
            }),
        );
    }

    parentList(params) {
        return this.httpClient.get('qx/blade-system/dict/parent-list', params);
    }

    childList(params) {
        return this.httpClient.get('qx/blade-system/dict/child-list', params);
    }

    submit(data) {
        return this.httpClient.post('qx/blade-system/dict/submit', data);
    }

    remove(ids: string) {
        return this.httpClient.post('qx/blade-system/dict/remove?ids=' + ids);
    }
}




