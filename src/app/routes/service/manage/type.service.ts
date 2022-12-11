import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { BASE_SERVER_URL } from '../../../app.config';

@Injectable()
export class TypeService {

  constructor(private httpClient: _HttpClient) { }

    /*获取设备类型信息*/
    queryTypeInfoList() {
        return this.httpClient.get<any>(BASE_SERVER_URL + 'electricity/devicecategory/selectAll');
    }
    /*添加区域分组信息*/
    addTypeInfoList(data) {
        return this.httpClient.post<any>(BASE_SERVER_URL + 'electricity/devicecategory/add', data);
    }

    /*编辑区域分组信息*/
    updateTypeInfoList(data) {
        return this.httpClient.post<any>(BASE_SERVER_URL + 'electricity/devicecategory/update', data);
    }

    /*获取所有配件*/
    getAllparts() {
        return this.httpClient.get<any>(BASE_SERVER_URL + '/electricity/part/selectAll');
    }

    /*删除设备类型分*/
    deleteTypeInfoList(id) {
        return this.httpClient.post<any>(BASE_SERVER_URL + 'electricity/devicecategory/delete', { id });
    }
}
