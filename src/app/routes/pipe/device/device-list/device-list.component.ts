import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ModalHelper} from '@delon/theme';
import {PipeService} from '../../pipe.service';
import {Router} from '@angular/router';

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


    constructor(private modal: ModalHelper, private pipeService: PipeService, private router: Router) {
    }

    ngOnInit(): void {
        this.load();
    }

    load() {
        const params = {
            current: this.pageInfo.pi,
            size: this.pageInfo.ps,
        };

        this.pageInfo.loading = true;
        this.pipeService.devicePage(params).subscribe((res) => {
            this.dataList = res.records;
            this.pageInfo.total = res.total;
            this.pageInfo.loading = false;
        });
    }


    add() {
        setTimeout(() => {
            this.router.navigate(['/pipe/device/edit']);
        }, 100);
    }

    edit(data: any) {
        if (data.id) {
            console.log(JSON.stringify(data));
            console.log(JSON.parse(JSON.stringify(data)));
            setTimeout(() => {
                this.router.navigate(['/pipe/device/edit', data.id]);
            }, 100);
        }
    }

    remove(data: any) {
        console.log(data);
        const postData = {
            id: data.id
        };
        this.pipeService.removeDevice(postData).subscribe(res => {
            this.load();
        });
    }
}
