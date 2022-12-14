import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable({
    providedIn: 'root',
})
export class PipeService {
    constructor(private httpClient: _HttpClient) {}
    devicePage(params) {
        return this.httpClient.get('pipe/device/page', params);
    }
}
