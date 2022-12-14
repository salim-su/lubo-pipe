import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ModalHelper } from '@delon/theme';
import { AlarmService } from '../../../service/manage/alarm.service';
import { PipeService } from '../../pipe.service';
import { AlarmProssComponent } from '../../../manage/alarm/alarm-pross/alarm-pross.component';
import { AlarmCheckComponent } from '../../../manage/alarm/alarm-check/alarm-check.component';

@Component({
    selector: 'app-device-list',
    templateUrl: './device-list.component.html',
    styleUrls: ['./device-list.component.less'],
})
export class DeviceListComponent implements OnInit {
    pageInfo = {
        pi: 1,
        ps: 10,
        total: 0,
        loading: false,
    };
    dataList: any;
    alarmType = [
        {
            key: 1,
            name: '漏电报警',
        },
        {
            key: 2,
            name: 'A相温度报警',
        },
        {
            key: 3,
            name: 'B相温度报警',
        },
        {
            key: 4,
            name: 'C相温度报警',
        },
        {
            key: 5,
            name: '零序温度报警',
        },
        {
            key: 6,
            name: '电流异常',
        },
    ];
    dateSearch = [
        {
            key: '1',
            name: '近一周',
            dateBegin: moment().subtract(1, 'week').format('YYYY-MM-DD'),
            dateEnd: moment().format('YYYY-MM-DD'),
        },
        {
            key: '2',
            name: '近一个月',
            dateBegin: moment().subtract(1, 'month').format('YYYY-MM-DD'),
            dateEnd: moment().format('YYYY-MM-DD'),
        },
        {
            key: '3',
            name: '近三个月',
            dateBegin: moment().subtract(3, 'month').format('YYYY-MM-DD'),
            dateEnd: moment().format('YYYY-MM-DD'),
        },
        {
            key: '4',
            name: '近半年',
            dateBegin: moment().subtract(6, 'month').format('YYYY-MM-DD'),
            dateEnd: moment().format('YYYY-MM-DD'),
        },
        {
            key: '5',
            name: '近一年',
            dateBegin: moment().subtract(1, 'year').format('YYYY-MM-DD'),
            dateEnd: moment().format('YYYY-MM-DD'),
        },
    ];
    selectedItem = {
        key: '',
        name: '',
    };
    selectedDateSearch = {
        key: '',
        name: '',
        dateBegin: '',
        dateEnd: '',
    };
    constructor(private modal: ModalHelper, private alarmService: AlarmService, private pipeService: PipeService) {}

    ngOnInit(): void {
        this.load();
    }
    load() {
        const params = {
            current: this.pageInfo.pi,
            size: this.pageInfo.ps,
            // alarmCategory: this.selectedItem.key,
            // alarmBeginTime: this.selectedDateSearch.dateBegin,
            // alarmEndTime: this.selectedDateSearch.dateEnd,
        };

        this.pageInfo.loading = true;
        this.pipeService.devicePage(params).subscribe((res) => {
            this.dataList = res.records;
            this.pageInfo.total = res.total;
            this.pageInfo.loading = false;
        });
    }

    clickitem(item) {
        if (item.name === this.selectedItem.name) {
            this.selectedItem = {
                key: '',
                name: '',
            };
        } else {
            this.selectedItem = item;
        }
        this.load();
    }

    clickDateSearchItem(item) {
        if (item.name === this.selectedDateSearch.name) {
            this.selectedDateSearch = {
                key: '',
                name: '',
                dateBegin: '',
                dateEnd: '',
            };
        } else {
            this.selectedDateSearch = item;
        }
        this.load();
    }

    pross(record) {
        this.modal
            .open(
                AlarmProssComponent,
                {
                    record,
                },
                600,
                {
                    nzClassName: 'alarmModalStyle',
                },
            )
            .subscribe((data) => {
                this.load();
            });
    }

    check(record) {
        this.modal
            .open(
                AlarmCheckComponent,
                {
                    record,
                },
                600,
                {
                    nzClassName: 'alarmModalStyle',
                },
            )
            .subscribe((data) => {
                this.load();
            });
    }
}
