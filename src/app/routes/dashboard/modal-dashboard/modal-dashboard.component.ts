import {Component, Input, OnInit} from '@angular/core';
import * as echarts from 'echarts';
import * as moment from 'moment';
import {PipeService} from '../../pipe/pipe.service';

@Component({
    selector: 'app-modal-dashboard',
    templateUrl: './modal-dashboard.component.html',
    styleUrls: ['./modal-dashboard.component.scss'],
})
export class ModalDashboardComponent implements OnInit {
    @Input()
    params;

    dataList = [];

    constructor(private pipeService: PipeService) {
    }

    ngOnInit(): void {
        const params = {
            beginTime: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            size: 20,
            current: 1,
            deviceNo: '3ce4976e-64e9-4db7-af98-e964c702cd1d'
        };

        this.pipeService.upDataLogPage(params).subscribe(res => {
            console.log(res?.records);
            this.dataList = res?.records;
            if (this.dataList.length > 0) {
                this.dataList.forEach((e) => {
                    e['jsonData'] = JSON.parse(e['jsonData']);
                    e['val'] = e['jsonData']['meterValue'];
                });
            }
            this.loadChart(this.dataList);

        });


    }

    loadChart(data) {
        console.log(data);
        const myChart = echarts.init(document.getElementById('chart'));
        const datarr = data.map(p => p.val);
        const useArr = [];
        datarr.forEach(e => {
            /*超标*/
            if (e < 3000) {
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
                data: data.map(p => moment(p.createTime).format('HH:mm')),
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
