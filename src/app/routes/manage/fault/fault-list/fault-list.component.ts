import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ModalHelper } from '@delon/theme';
import { FaultProssComponent } from '../fault-pross/fault-pross.component';
import { FaultCheckComponent } from '../fault-check/fault-check.component';
import { FaultService } from '../../../service/manage/fault.service';

@Component({
    selector: 'app-fault-list',
    templateUrl: './fault-list.component.html',
    styleUrls: ['./fault-list.component.less'],
})
export class FaultListComponent implements OnInit {
    faultType = [
        {
            key: 17,
            name: 'A相过流',
        },
        {
            key: 18,
            name: 'B相过流',
        },
        {
            key: 19,
            name: 'C相过流',
        },
        {
            key: 20,
            name: 'A相过压',
        },
        {
            key: 21,
            name: 'B相过压',
        },
        {
            key: 22,
            name: 'C相过压',
        },
        {
            key: 23,
            name: 'A相缺相',
        },
        {
            key: 24,
            name: 'B相缺相',
        },
        {
            key: 25,
            name: 'C相缺相',
        },
        {
            key: 26,
            name: 'A相欠压',
        },
        {
            key: 27,
            name: 'B相欠压',
        },
        {
            key: 28,
            name: 'C相欠压',
        },
    ];

    dateSearch = [
        {
            key: '1',
            name: '近一周',
            dateBegin: moment().subtract(1, 'week').format('YYYY-MM-DD'),
            dateEnd: moment().format('YYYY-MM-DD'),

        }, {
            key: '2',
            name: '近一个月',
            dateBegin: moment().subtract(1, 'month').format('YYYY-MM-DD'),
            dateEnd: moment().format('YYYY-MM-DD'),

        }, {
            key: '3',
            name: '近三个月',
            dateBegin: moment().subtract(3, 'month').format('YYYY-MM-DD'),
            dateEnd: moment().format('YYYY-MM-DD'),

        }, {
            key: '4',
            name: '近半年',
            dateBegin: moment().subtract(6, 'month').format('YYYY-MM-DD'),
            dateEnd: moment().format('YYYY-MM-DD'),

        }, {
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
    pageInfo = {
        pi: 1,
        ps: 10,
        total: 0,
        loading: false,
    };
    dataList: any;

    constructor(private modal: ModalHelper, private faultService: FaultService) {
    }

    ngOnInit(): void {
        this.load();
    }

    load() {
        const params = {
            current: this.pageInfo.pi,
            size: this.pageInfo.ps,
            faultCategory: this.selectedItem.key,
            faultBeginTime: this.selectedDateSearch.dateBegin,
            faultEndTime: this.selectedDateSearch.dateEnd,

        };

        this.pageInfo.loading = true;
        this.faultService.page(params).subscribe(res => {
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
            .open(FaultProssComponent, {
                record,
            }, 600, {
                nzClassName: 'alarmModalStyle',

            })
            .subscribe(data => {
                this.load();
            });
    }

    check(record) {
        this.modal
            .open(FaultCheckComponent, {
                record,
            }, 600, {
                nzClassName: 'alarmModalStyle',

            })
            .subscribe(data => {
                this.load();
            });
    }
}
