import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SpssService } from '../../../service/manage/spss.service';

@Component({
    selector: 'app-alarm-spss-list',
    templateUrl: './alarm-spss-list.component.html',
    styleUrls: ['./alarm-spss-list.component.less'],
})
export class AlarmSpssListComponent implements OnInit {
    dateMonth1 = moment().subtract(1, 'week').format('YYYY-MM-DD');
    dateMonth2 = moment().format('YYYY-MM-DD');
    searchData = {
        beginDate: this.dateMonth1,
        endDate: this.dateMonth2,
    };

    constructor(private message: NzMessageService, private spssService: SpssService) {}

    ngOnInit(): void {
        this.loadAll(this.searchData);
    }

    loadChartsAlarmSpss(data) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('alarm_spss'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985',
                    },
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
                    boundaryGap: false,
                    data: data?.map((p) => p.date),
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
                },
            ],
            series: [
                {
                    name: '报警统计',
                    type: 'line',
                    symbolSize: 1,
                    smooth: true,
                    color: '#15AFB2',
                    areaStyle: {
                        opacity: 0.8,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#15AFB2',
                            },
                            {
                                offset: 1,
                                color: '#0F1B2A',
                            },
                        ]),
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    itemStyle: {
                        normal: {
                            color: '#15AFB2',
                            lineStyle: {
                                width: 1,
                            },
                        },
                    },
                    data: data?.map((p) => p.amount),
                },
            ],
        });
    }

    loadChartsAlarmType(data) {
        if (data?.length) {
            data.forEach((res) => {
                res['value'] = res?.amount;
                res['name'] = res?.categoryText;
            });
        }

        const myChart = echarts.init(document.getElementById('alarm_type'));
        myChart.setOption({
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: 'bottom',
                textStyle: {
                    fontSize: 12,
                    color: '#90BAC9',
                },
            },
            series: [
                {
                    name: '报警类别',
                    type: 'pie',
                    radius: [20, 60],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                color: '#90BAC9',
                            },
                        },
                        borderRadius: 4,
                    },
                    data,
                    color: ['#6BEEF3', '#BCFFFE', '#1A8288', '#2F9DAB', '#3FBFD3'],
                },
            ],
        });
    }

    loadChartsFaultSpss(data) {
        // 基于准备好的dom，初始化echarts实例
        const myChart = echarts.init(document.getElementById('fault_spss'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985',
                    },
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
                    boundaryGap: false,
                    data: data?.map((p) => p.date),
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
                },
            ],
            series: [
                {
                    name: '故障统计',
                    type: 'line',
                    smooth: true,
                    symbolSize: 3,
                    color: '#14B0B2',
                    emphasis: {
                        focus: 'series',
                    },
                    itemStyle: {
                        normal: {
                            color: '#14B0B2',
                            lineStyle: {
                                width: 1,
                            },
                        },
                    },
                    data: data?.map((p) => p.amount),
                },
            ],
        });
    }

    loadChartsFaultType(data) {
        console.log(data);
        if (data?.length > 0) {
            data.forEach((res) => {
                res['value'] = res?.amount;
                res['name'] = res?.categoryText;
            });
        }
        console.log(data);
        const myChart = echarts.init(document.getElementById('fault_type'));
        myChart.setOption({
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: 'bottom',
                textStyle: {
                    fontSize: 12,
                    color: '#90BAC9',
                },
            },
            series: [
                {
                    name: '故障类别',
                    type: 'pie',
                    radius: '50%',
                    data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                color: '#90BAC9',
                            },
                        },
                        borderRadius: 4,
                    },
                },
            ],
            color: ['#1BF0EE', '#85E3DE'],
        });
    }

    loadAll(searchData) {
        this.alarmAmountByDay(searchData);
        this.alarmCategoryStatistics(searchData);
        this.faultAmountByDay(searchData);
        this.faultCategoryStatistics(searchData);
    }

    /*按天统计报警数量*/
    alarmAmountByDay(searchData) {
        const postData = searchData;
        this.spssService.alarmAmountByDay(postData).subscribe((res) => {
            console.log(res);
            this.loadChartsAlarmSpss(res);
        });
    }

    /*报警分类统计*/
    alarmCategoryStatistics(searchData) {
        const postData = searchData;
        this.spssService.alarmCategoryStatistics(postData).subscribe((res) => {
            console.log(res);
            this.loadChartsAlarmType(res);
        });
    }

    /*按天统计故障数量*/
    faultAmountByDay(searchData) {
        const postData = searchData;
        this.spssService.faultAmountByDay(postData).subscribe((res) => {
            console.log(res);
            this.loadChartsFaultSpss(res);
        });
    }

    /*故障分类统计*/
    faultCategoryStatistics(searchData) {
        const postData = searchData;
        this.spssService.faultCategoryStatistics(postData).subscribe((res) => {
            console.log(res);
            this.loadChartsFaultType(res);
        });
    }

    search() {
        if (!this.dateMonth1 || !this.dateMonth2) {
            this.message.warning('请选择时间');
            return;
        }

        const searchData = {
            beginDate: moment(this.dateMonth1).format('YYYY-MM-DD'),
            endDate: moment(this.dateMonth2).format('YYYY-MM-DD'),
        };
        console.log(searchData);
        this.loadAll(searchData);
    }

    changeD1(e) {
        this.search();
    }
    changeD2(e) {
        this.search();
    }
}
