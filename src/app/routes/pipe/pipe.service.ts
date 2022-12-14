import {Injectable} from '@angular/core';
import {_HttpClient} from '@delon/theme';

@Injectable({
    providedIn: 'root',
})
export class PipeService {
    constructor(private httpClient: _HttpClient) {
    }

    devicePage(params) {
        return this.httpClient.get('pipe/device/page', params);
    }

    alarmPage(params) {
        return this.httpClient.get('pipe/alarm/page', params);
    }
    upDataLogPage(params) {
        return this.httpClient.get('pipe/upDataLog/page', params);
    }

    deviceCategoryList() {
        return this.httpClient.get('pipe/device/deviceCategoryList');
    }
    deviceList() {
        return this.httpClient.get('pipe/device/deviceList');
    }

    submit(data) {
        return this.httpClient.post('pipe/device/save', data);
    }

    loadDeviceInfoById(id) {
        return this.httpClient.get('pipe/device/detail', {id});
    }

    removeDevice(data) {
        return this.httpClient.post('pipe/device/delete', data);
    }
}
