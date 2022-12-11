import {Component, Input, OnInit} from '@angular/core';
import * as echarts from 'echarts';

@Component({
    selector: 'app-modal-dashboard',
    templateUrl: './modal-dashboard.component.html',
    styleUrls: ['./modal-dashboard.component.scss'],
})
export class ModalDashboardComponent implements OnInit {
    @Input()
    params;

    constructor() {
    }

    ngOnInit(): void {
        this.loadChart('');
    }

    loadChart(data) {
        const myChart = echarts.init(document.getElementById('chart'));
        const datarr = [120, 200, 150, 80, 70, 110, 130, 130, 130, 130, 130, 130];
        const useArr = [];
        datarr.forEach(e => {
            if (e < 140) {
                useArr.push(e);
            } else {
                const a = {
                    value: e,
                    itemStyle: {
                        color: '#a90000'
                    }
                };
                useArr.push(a);
            }
        });
        myChart.setOption({
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: ['13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00', '13:00'],
                axisTick: {
                    alignWithLabel: true,
                },
                axisLine: {
                    lineStyle: {
                        color: '#B2EDFE',
                    },
                },
            },
            yAxis: {
                type: 'value',
                minInterval: 1,
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
            series: [
                {
                    // data: [
                    //     120,
                    //     {
                    //         value: 200,
                    //         itemStyle: {
                    //             color: '#a90000'
                    //         }
                    //     },
                    //     150,
                    //     80,
                    //     70,
                    //     110,
                    //     130,
                    //     130,
                    //     130,
                    //     130,
                    //     130,
                    //     130,
                    // ],
                    data: useArr,
                    type: 'bar',
                    barWidth: '40%',
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: '#275BA6'},
                        {offset: 1, color: '#072C6D'},
                    ]),
                }
            ]
        });


    }
}
