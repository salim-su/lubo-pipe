import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable({ providedIn: 'root' })
export class SUploadService {
    constructor(private httpClient: _HttpClient) {
    }


    getIds(ids) {
        return this.httpClient.get('blade-resource/attach/listByIds?ids=' + ids);
    }

}
