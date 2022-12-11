import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable()
export class AlarmService {

    constructor(private httpClient: _HttpClient) {
    }

    // 报警历史分页
    page(params) {
        return this.httpClient.get('electricity/alarm/alarmRecordPage', params);
    }

    /*误报*/
    mistake(id) {
        return this.httpClient.post<any>('electricity/alarm/mistake', { id });
    }

    /*派工*/
    dispatch(id, dispatchResponsiblePerson, dispatchTime) {
        return this.httpClient.post<any>('electricity/alarm/dispatch', {
            id,
            dispatchResponsiblePerson,
            dispatchTime,
        });
    }

    /*已处置*/
    handle(id, handleResult) {
        return this.httpClient.post<any>('electricity/alarm/handle', { id, handleResult });
    }



    // /*派工*/
    // dispatch(data) {
    //     return this.httpClient.post<any>('electricity/alarm/dispatch', data);
    // }
    //
    // /*处置*/
    // handle(data) {
    //     return this.httpClient.post<any>('electricity/alarm/handle', data);
    // }
    //
    // /*误报*/
    // mistake(data) {
    //     return this.httpClient.post<any>('electricity/alarm/mistake', data);
    // }
}

