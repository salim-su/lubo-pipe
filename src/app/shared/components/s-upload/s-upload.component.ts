import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { _HttpClient } from '@delon/theme';
import { saveAs } from 'file-saver/src/FileSaver';
import { SUploadService } from './s-upload.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-s-upload',
    templateUrl: './s-upload.component.html',
    styles: [],
})
export class SUploadComponent implements OnInit, OnChanges {
    @Input()
    isPicture = false;
    @Input()
    fileList: any = [];
    @Output()
    fileListChange = new EventEmitter();
    @Input()
    nzMultipleFlag = false;
    @Input()
    isEdit = true;
    @Input()
    ossIds;
    @Input()
    link;
    @Input()
    nzAcceptType = '';
    @Output()
    sDelete = new EventEmitter();

    constructor(public http: _HttpClient, public sUploadService: SUploadService, private msgSrv: NzMessageService) {}

    ngOnInit(): void {
        if (this.ossIds) {
            this.sUploadService.getIds(this.ossIds).subscribe((res) => {
                console.log(res);
                const addFile = [];
                res.forEach((element) => {
                    console.log(element);
                    addFile.push({ ...element, url: element.link });
                });
                this.fileList = addFile;
                console.log(this.fileList);
                this.fileListChange.emit(this.fileList);
            });
        } else if (this.link) {
            const addFile = [];
            addFile.push({
                link: this.link,
            });
            this.fileList = addFile;
            setTimeout((res) => {
                this.fileListChange.emit(this.fileList);
            });
        }
    }

    change($event: NzUploadChangeParam) {
        console.log($event);
        if ($event['type'] === 'error') {
            this.msgSrv.warning('文件上传失败');
        }

        if ($event.type === 'success') {
            $event.file.response['id'] = $event.file.response['attachId'];
            this.fileList = this.fileList.concat($event.file.response);
            this.fileListChange.emit(this.fileList);
            console.log(this.fileList);

            this.msgSrv.success('文件上传成功');
        }
    }

    show(item: any) {
        const u = encodeURIComponent(window.btoa(item?.link));

        const url = 'http://39.101.142.139:8012/onlinePreview?url=' + u;
        window.open(url);
    }

    // 下载
    download(item) {
        const url = item.link;
        this.http.request('GET', url, { responseType: 'blob' }).subscribe((res) => {
            const fileName = item.originalName;
            const blob = new Blob([res], { type: 'application/octet-stream' });
            saveAs(blob, fileName);
        });
    }

    // 删除
    del(index) {
        this.fileList.splice(index, 1);
        this.fileListChange.emit(this.fileList);
        this.sDelete.emit(this.fileList);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        if (changes.ossIds && !changes.ossIds.firstChange) {
            this.sUploadService.getIds(this.ossIds).subscribe((res) => {
                console.log(res);
                const addFile = [];
                res.forEach((element) => {
                    addFile.push({ ...element, url: element.link });
                });
                this.fileList = addFile;
                console.log(this.fileList);
                this.fileListChange.emit(this.fileList);
            });
        }
    }
}
