import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { BASE_SERVER_URL } from '../../app.config';

@Injectable()
export class HomepageService {

    constructor(private httpClient: _HttpClient) {

    }

    loadFuHeQuXian(dateType) {
        return this.httpClient.get('electricity/homepage/loadChart', { dateType });
    }
    loadYongDianLiang(dateType) {
        return this.httpClient.get('electricity/homepage/electricityChart', { dateType });
    }
    loadFuHeJiZhi() {
        return this.httpClient.get('electricity/homepage/loadExtremum');
    }
    loadBaseInfo() {
        return this.httpClient.get('electricity/homepage/baseInfo');
    }
    loadAlarmType(){
        return this.httpClient.get('electricity/homepage/alarmCategoryStatistics');
    }

}
