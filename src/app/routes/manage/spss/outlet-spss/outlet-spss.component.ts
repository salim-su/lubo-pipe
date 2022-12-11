import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SpssService } from '../../../service/manage/spss.service';
import { DeviceService } from '../../../service/manage/device.service';
import * as echarts from 'echarts';

@Component({
    selector: 'app-outlet-spss',
    templateUrl: './outlet-spss.component.html',
    styleUrls: ['./outlet-spss.component.less'],
})
export class OutletSpssComponent implements OnInit {
    searchData = {
        dateType: 'day',
        deviceCategoryId: '2',
        deviceNo: null,
    };
    selectedItem: any;
    deviceList = [];
    pageInfo = {
        pi: 1,
        ps: 10,
        total: 0,
        loading: false,
    };
    dataList: any;

    constructor(private message: NzMessageService, private spssService: SpssService, private deviceService: DeviceService) {}

    ngOnInit(): void {
        this.loadDevices();
        this.chartsAlarmSpss(this.searchData);
    }

    loadChartsAlarmSpss(data) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('alarm_spss'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: (params, ticket, callback) => {
                    console.log(params);
                    let showHtm = '';
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < params.length; i++) {
                        const name = params[i]['seriesName'];
                        // const value = Math.round(params[i].value / 1000 * 100) / 100;
                        const value = params[i].value;
                        showHtm += params[i].marker + name + ':' + value + 'kwh' + '<br>';
                    }
                    return showHtm;
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    data: data?.key,
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#B2EDFE',
                        },
                    },
                },
            ],
            yAxis: [
                {
                    minInterval: 1,
                    type: 'value',
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: ['#303a4e'],
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#B2EDFE',
                        },
                    },
                    axisLabel: {
                        formatter: (value) => {
                            // return value / 1000 + 'kw';
                            return value + 'kwh';
                        },
                    },
                },
            ],
            series: [
                {
                    name: '能耗',
                    type: 'bar',
                    barWidth: '40%',
                    data: data?.valueThis,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#4CD8E5' }, //柱图渐变色
                        { offset: 1, color: '#2C90C3' }, //柱图渐变色
                    ]),
                },
            ],
        });
    }

    chartsAlarmSpss(searchData) {
        this.spssService.loadYongDianLiang(searchData).subscribe((res) => {
            this.loadChartsAlarmSpss(res);
        });
    }

    radioChange(e: any) {
        this.searchData.dateType = e;
        this.chartsAlarmSpss(this.searchData);
    }

    clickItem(item) {
        this.selectedItem = item;
        this.searchData.deviceNo = item?.no;
        this.chartsAlarmSpss(this.searchData);
        this.loadDeviceUpData();
    }

    loadDevices() {
        this.deviceService.list({ deviceCategoryId: '2' }).subscribe((res) => {
            this.deviceList = res;
        });
    }

    loadDeviceUpData() {
        const params = {
            current: this.pageInfo.pi,
            size: this.pageInfo.ps,
            deviceNo: this.selectedItem?.no,
            commandCode: '21008100ff',
        };
        this.pageInfo.loading = true;
        this.spssService.loadDeviceUpData(params).subscribe((res) => {
            this.dataList = res.records;
            if (this.dataList.length > 0) {
                this.dataList.forEach((e) => {
                    e['jsonData'] = JSON.parse(e['jsonData']);
                });
            }
            console.log(this.dataList);
            this.pageInfo.total = res.total;
            this.pageInfo.loading = false;
        });
    }
}
