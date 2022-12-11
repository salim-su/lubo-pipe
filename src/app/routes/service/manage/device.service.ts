import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable()
export class DeviceService {
    selectItem = {};

    constructor(private httpClient: _HttpClient) {}

    /*加载所有区域设备*/
    loadAreaDevices() {
        return this.httpClient.get<any>('electricity/area/list');
    }

    // 查询区域下所有设备
    page(params) {
        return this.httpClient.get('electricity/device/page', params);
    } // 查询区域下所有设备
    list(params) {
        return this.httpClient.get('electricity/device/list', params);
    } // 查询区域下所有设备
    deviceLatestData(params) {
        return this.httpClient.get('electricity/device/deviceLatestData', params);
    }
    // 车辆最新信息
    truckLatestData(params) {
        return this.httpClient.get('electricity/device/truckLatestData', params);
    }

    /*通过设备ID查询设备信息*/
    loadDeviceInfoById(id) {
        return this.httpClient.get('electricity/device/getDeviceInfo', { id });
    }

    /*字典获取设备所属区域*/
    loadDicDeviceArea() {
        return this.httpClient.get('electricity/area/list');
    }

    /*字典获取设备类别*/
    loadDicDeviceType() {
        return this.httpClient.get('electricity/devicecategory/selectAll');
    }

    submit(data) {
        return this.httpClient.post('electricity/device/submit', data);
    }

    updateThreeDInfo(params) {
        return this.httpClient.post('electricity/device/updateThreeDInfo', params);
    }

    remove(ids: string) {
        return this.httpClient.post('electricity/device/remove?ids=' + ids);
    }
}
