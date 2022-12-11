import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { BASE_SERVER_URL } from '../../../app.config';

@Injectable()
export class MonthreportService {

    constructor(private httpClient: _HttpClient) {

    }

    /*时间轴*/
    getTimeLine(organCode) {
        return this.httpClient.get<any>(BASE_SERVER_URL + '/electricity/statistics/getMonthlyReportDate', { organCode: organCode });
    }

    /*饼图*/
    getPieChart(beginDate, endDate, organCode) {
        return this.httpClient.get<any>(BASE_SERVER_URL + '/electricity/statistics/alarmAndFaultMainCategoryStatistics', {
            beginDate,
            endDate,
            organCode,
        });
    }

    /*柱状图*/
    getPillarChart(beginDate, endDate, organCode) {
        return this.httpClient.get<any>(BASE_SERVER_URL + '/electricity/statistics/alarmAndFaultAreaStatistics', {
            beginDate,
            endDate,
            organCode,
        });
    }

    /*结论*/
    getjielun(organCode, reportDate) {
        return this.httpClient.get<any>(BASE_SERVER_URL + '/electricity/statistics/getMonthlyReportInfo', {
            organCode,
            reportDate,
        });

    }

    /*时间轴 分页查询报警故障历史记录*/
    selectRecordByPage(beginTime, endTime, category, current, deviceId, organCode, size, queryParams) {
        const postData = Object.assign(queryParams, {
            beginTime, endTime, category, current, deviceId, organCode, size,
        });
        return this.httpClient.get<any>(BASE_SERVER_URL + 'electricity/alarmfault/selectRecordByPage', postData);
    }


}
