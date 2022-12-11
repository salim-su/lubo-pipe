import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable()
export class AreaService {

    constructor(private httpClient: _HttpClient) {
    }


    // 区域列表分页
    page(params) {
        return this.httpClient.get('electricity/area/page', params);
    }
    remove(ids: string) {
        return this.httpClient.post('electricity/area/remove?ids=' + ids);
    }
    submit(data) {
        return this.httpClient.post('electricity/area/submit', data);
    }
}
