import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable()
export class SpssService {
    constructor(private httpClient: _HttpClient) {}

    /*按天统计报警数量*/
    alarmAmountByDay(data) {
        return this.httpClient.get<any>('electricity/statistics/alarmAmountByDay', data);
    }

    /*报警分类统计*/
    alarmCategoryStatistics(data) {
        return this.httpClient.get<any>('electricity/statistics/alarmCategoryStatistics', data);
    }

    /*按天统计故障数量*/
    faultAmountByDay(data) {
        return this.httpClient.get<any>('electricity/statistics/faultAmountByDay', data);
    }

    /*故障分类统计*/
    faultCategoryStatistics(data) {
        return this.httpClient.get<any>('electricity/statistics/faultCategoryStatistics', data);
    }

    /*用电量统计*/
    loadYongDianLiang(data) {
        return this.httpClient.get('electricity/homepage/electricityChart', data);
    }

    /*查询设备上传数据*/
    loadDeviceUpData(data) {
        return this.httpClient.get('electricity/device/deviceUpData', data);
    }

    /*用水量统计*/
    loadYongShuiLiang(data) {
        return this.httpClient.get('electricity/homepage/waterChart', data);
    }
}
