import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import { HomepageService } from '../../service/homepage.service';
import { DeviceService } from '../../service/manage/device.service';
import { DashboardService } from '../../dashboard/dashboard.service';

@Component({
    selector: 'app-right-panel',
    templateUrl: './right-panel.component.html',
    styleUrls: ['./right-panel.component.less'],
})
export class RightPanelComponent implements OnInit {
    radioValue = 'day';
    radioValueList = ['day', 'month', 'year'];
    chartLine: any;
    chartPie: any;
    pieInfo: any;
    fuhejizhi: any;
    chart: any;

    constructor(
        private homepageService: HomepageService,
        private deviceService: DeviceService,
        private dashboardService: DashboardService,
    ) {}

    ngOnInit(): void {
        this.loadFuHeQuXian('day');
        this.loadYongDianLiang('day');
        this.loadAlarmType();
        this.loadFuHeJiZhi();
        this.dashboardService.leftPanelFalg.subscribe((res) => {
            /*变化*/
            this.chartLine.clear();
            this.chart.clear();
            this.loadYongDianLiang('day');
            this.loadFuHeQuXian('day');
            this.loadAlarmType();
        });

        setTimeout((res) => {
            setInterval((res) => {
                this.refreshData();
            }, 300000);
        }, 300000);
        this.loopChart(this.radioValueList, 10000);
    }

    loadYongDianLiang(dateType) {
        this.homepageService.loadYongDianLiang(dateType).subscribe((res) => {
            this.loadChartsLine(res);
        });
    }

    loadAlarmType() {
        this.homepageService.loadAlarmType().subscribe((res) => {
            this.pieInfo = res;
            // this.loadChartsPie(res);
        });
    }

    loadChartsPie(data) {
        // 基于准备好的dom，初始化echarts实例
        this.chartPie = echarts.init(document.getElementById('mainPie'));
        // 绘制图表
        this.chartPie.setOption({
            tooltip: {
                trigger: 'item',
                formatter: (params, ticket, callback) => {
                    console.log(params);
                    let showHtm = '';
                    const value = params.value + '%';
                    const name = params.name;
                    showHtm += params.marker + name + value;
                    return showHtm;
                },
            },
            series: [
                {
                    name: '报警类型',
                    type: 'pie',
                    radius: [20, 80],
                    center: ['50%', '50%'],
                    roseType: 'radius',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                color: '#fff',
                            },
                        },
                        borderRadius: 5,
                    },
                    data: [
                        { value: data?.leakageRate * 100, name: '漏电报警' },
                        { value: data?.temperatureRate * 100, name: '温感报警' },
                    ],
                    color: ['#15F2F5', '#EFBE1E'],
                },
            ],
        });
    }

    loadChartsLine(data) {
        // 基于准备好的dom，初始化echarts实例
        this.chartLine = echarts.init(document.getElementById('mainLine'));
        // 绘制图表
        this.chartLine.setOption({
            tooltip: {
                trigger: 'axis',
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
            legend: {
                x: 'center',
                y: 'bottom',
                icon: 'line',
                data: ['今日用电量', '昨日用电量'],
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3',
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '12%',
                top: '12%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data?.key,
                axisLine: {
                    lineStyle: {
                        color: '#B2EDFE',
                    },
                },
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#B2EDFE',
                    },
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: ['#303a4e'],
                    },
                },
                axisLabel: {
                    formatter: (value) => {
                        // return value / 1000 + 'kwh';
                        return value + 'kwh';
                    },
                },
            },
            series: [
                {
                    name: '今日用电量',
                    type: 'line',
                    smooth: true,
                    color: '#3EB3F0',
                    symbolSize: 1,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1,
                            },
                        },
                    },
                    data: data?.valueThis,
                },
                {
                    name: '昨日用电量',
                    type: 'line',
                    smooth: true,
                    color: '#0BECAA',
                    symbolSize: 1,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 1,
                            },
                        },
                    },
                    data: data?.valueLast,
                },
            ],
        });
    }

    radioChange(e: any) {
        console.log(e);
        this.loadYongDianLiang(e);
        this.loadFuHeQuXian(e);
    }

    refreshData() {
        // this.chartLine.clear();
        // this.loadYongDianLiang('day');
        this.loadAlarmType();
        this.loadFuHeJiZhi();
    }
    loopChart(data, times: number) {
        let index = 0;
        setInterval((res) => {
            index++;
            this.radioValue = data[index % 3];
            this.loadYongDianLiang(this.radioValue);
            this.loadFuHeQuXian(this.radioValue);
        }, times);
    }

    /*负荷极值*/
    loadFuHeJiZhi() {
        this.homepageService.loadFuHeJiZhi().subscribe((res) => {
            console.log(res);
            this.fuhejizhi = res;
        });
    }

    /*负荷曲线*/
    loadFuHeQuXian(dateType) {
        this.homepageService.loadFuHeQuXian(dateType).subscribe((res) => {
            this.loadCharts(res);
        });
    }

    loadCharts(data) {
        // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(document.getElementById('main'));
        // 绘制图表
        this.chart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                },
                formatter: (params, ticket, callback) => {
                    console.log(params);
                    let showHtm = '';
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < params.length; i++) {
                        const name = params[i]['seriesName'];
                        const value = Math.round((params[i].value / 1000) * 100) / 100;
                        showHtm += params[i].marker + name + ':' + value + 'kw' + '<br>';
                    }
                    return showHtm;
                },
            },
            legend: {
                x: 'center',
                y: 'bottom',
                icon: 'circle',
                itemHeight: 7,
                data: ['最大负荷', '平均负荷', '最小负荷', '负荷率'],
                textStyle: {
                    fontSize: 12,
                    color: '#F1F1F3',
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                containLabel: true,
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: data.key,
                    axisLine: {
                        lineStyle: {
                            color: '#B2EDFE',
                        },
                    },
                },
            ],
            yAxis: [
                {
                    type: 'value',
                    // splitLine: {
                    //     show: false,
                    // },
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
                            return value / 1000 + 'kw';
                        },
                    },
                },
            ],
            series: [
                {
                    name: '最大负荷',
                    type: 'line',
                    // stack: '总量',
                    symbolSize: 1,
                    smooth: true,
                    color: '#90BAC9',
                    // areaStyle: {
                    //     opacity: 0.8,
                    //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //         offset: 0,
                    //         color: '#497185',
                    //     }, {
                    //         offset: 1,
                    //         color: '#0F1B2A',
                    //     }]),
                    // },
                    emphasis: {
                        focus: 'series',
                    },
                    itemStyle: {
                        normal: {
                            color: '#90BAC9',
                            lineStyle: {
                                width: 1,
                            },
                        },
                    },
                    data: data?.valueMax,
                },
                {
                    name: '平均负荷',
                    type: 'line',
                    // stack: '总量',
                    symbolSize: 1,
                    // areaStyle: {
                    //     opacity: 0.8,
                    //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //         offset: 0,
                    //         color: '#165774',
                    //     }, {
                    //         offset: 1,
                    //         color: '#0C1F32',
                    //     }]),
                    // },
                    smooth: true,
                    emphasis: {
                        focus: 'series',
                    },
                    itemStyle: {
                        normal: {
                            color: '#128CA9',
                            lineStyle: {
                                width: 1,
                            },
                        },
                    },
                    data: data?.valueAvg,
                },
                {
                    name: '最小负荷',
                    type: 'line',
                    // stack: '总量',
                    symbolSize: 1,
                    // areaStyle: {
                    //     opacity: 0.8,
                    //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    //         offset: 0,
                    //         color: '#364883',
                    //     }, {
                    //         offset: 1,
                    //         color: '#1F274E',
                    //     }]),
                    // },
                    smooth: true,
                    emphasis: {
                        focus: 'series',
                    },
                    itemStyle: {
                        normal: {
                            color: '#3E5090',
                            lineStyle: {
                                width: 1,
                            },
                        },
                    },
                    data: data?.valueMin,
                },
            ],
        });
    }
}
