import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { saveAs } from 'file-saver';

@Injectable()
export class StatisticsService {
    constructor(private httpClient: _HttpClient) {}

    // 变电所汇总统计列表
    reportBdsList(params) {
        return this.httpClient.get('electricity/statistics/reportBdsList', params);
    }

    // 光伏汇总统计列表
    reportPhotovoltaicList(params) {
        return this.httpClient.get('electricity/statistics/reportPhotovoltaicList', params);
    }

    // 导出光伏汇总统计
    reportPhotovoltaicExport(params) {
        const url = `electricity/statistics/reportPhotovoltaicExcel?beginDate=${params.beginDate}&endDate=${params.endDate}`;
        this.httpClient.request('GET', url, { responseType: 'blob', observe: 'response' }).subscribe((res) => {
            const blob = new Blob([res.body], { type: 'application/octet-stream' });
            saveAs(blob, decodeURI('光伏汇总统计.xls'));
        });
    }

    // 导出变电所汇总统计
    reportBdsExport(params) {
        const url = `electricity/statistics/reportBdsExcel?beginDate=${params.beginDate}&endDate=${params.endDate}&deviceCategoryId=${params.deviceCategoryId}`;
        this.httpClient.request('GET', url, { responseType: 'blob', observe: 'response' }).subscribe((res) => {
            const blob = new Blob([res.body], { type: 'application/octet-stream' });
            saveAs(blob, decodeURI('能耗汇总统计.xls'));
        });
    }

    // 能耗汇总统计列表
    reportEnergyList(params) {
        return this.httpClient.get('electricity/statistics/reportEnergyList', params);
    }

    // 导出能耗汇总统计
    reportEnergyExport(params) {
        const url = `electricity/statistics/reportEnergyExcel?beginDate=${params.beginDate}&endDate=${params.endDate}&deviceCategoryId=${params.deviceCategoryId}`;
        this.httpClient.request('GET', url, { responseType: 'blob', observe: 'response' }).subscribe((res) => {
            const blob = new Blob([res.body], { type: 'application/octet-stream' });
            saveAs(blob, decodeURI('用电量汇总统计.xls'));
        });
    }

    // 用水量汇总统计列表
    reportWaterList(params) {
        return this.httpClient.get('electricity/statistics/reportWaterList', params);
    }

    // 导出用水量汇总统计
    reportWaterExport(params) {
        const url = `electricity/statistics/reportWaterExcel?beginDate=${params.beginDate}&endDate=${params.endDate}`;
        this.httpClient.request('GET', url, { responseType: 'blob', observe: 'response' }).subscribe((res) => {
            const blob = new Blob([res.body], { type: 'application/octet-stream' });
            saveAs(blob, decodeURI('用水量汇总统计.xls'));
        });
    }
}
