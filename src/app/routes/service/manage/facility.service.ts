import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { BASE_SERVER_URL } from '../../../app.config';

@Injectable()
export class FacilityService {
    selectItem = {};

    constructor(private httpClient: _HttpClient) {
    }

    /*获取全部传感器类型*/
    querySensorTypeList() {
        return this.httpClient.get<any>(BASE_SERVER_URL + 'electricity/sensorcategory/selectAll');
    }

    /*添加设备*/
    addfacilityList(data) {
        return this.httpClient.post<any>(BASE_SERVER_URL + 'electricity/device/add', data);
    }


    /*编辑设备*/
    editfacilityList(data) {
        return this.httpClient.post<any>(BASE_SERVER_URL + 'electricity/device/update', data);
    }

    /*分页查询设备*/

    queryFacilityList(current, organCode, size, areaId, queryParams) {
        const postData = Object.assign(queryParams, {
            current, organCode, size, areaId,
        });
        return this.httpClient.get<any>(BASE_SERVER_URL + 'electricity/device/selectDeviceByPage', postData);
    }

    /*根据ID查询设备信息*/
    queryFacilityById(id) {
        return this.httpClient.get<any>(BASE_SERVER_URL + 'electricity/device/getDeviceInfo', { id: id });

    }

    /*查询通讯状态*/

    queryCommunication(organCode) {
        return this.httpClient.get<any>(BASE_SERVER_URL + 'electricity/device/countConnectionStatus', { organCode: organCode });

    }

    /*查询设备状态*/
    queryDeviceStatus(organCode) {
        return this.httpClient.get<any>(BASE_SERVER_URL + 'electricity/device/countDeviceStatus', { organCode: organCode });

    }

    /*查询所有设备*/
    queryFacilityListNoPage(organCode, areaId) {
        return this.httpClient.get<any>(BASE_SERVER_URL + 'electricity/device/selectAllDevice', {
            organCode: organCode,
            areaId: areaId,
        });
    }


    /*删除设备*/
    deleteFacility(id) {
        return this.httpClient.post<any>(BASE_SERVER_URL + 'electricity/device/delete', { id: id });
    }

    /*监控设备最新数据*/
    quertMonitoringEquipment(organCode) {
        return this.httpClient.get<any>(BASE_SERVER_URL + 'electricity/monitor/selectDeviceLatestData', { organCode: organCode });
    }


}

