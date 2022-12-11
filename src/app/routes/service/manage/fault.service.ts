import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Injectable()
export class FaultService {

    constructor(private httpClient: _HttpClient) {
    }
    // 报警历史分页
    page(params) {
        return this.httpClient.get('electricity/fault/faultRecordPage', params);
    }
    /*误报*/
    mistake(id) {
        return this.httpClient.post<any>('electricity/fault/mistake', { id });
    }

    /*派工*/
    dispatch(id, dispatchResponsiblePerson, dispatchTime) {
        return this.httpClient.post<any>('electricity/fault/dispatch', { id, dispatchResponsiblePerson, dispatchTime });
    }

    /*已处置*/
    handle(id, handleResult) {
        return this.httpClient.post<any>('electricity/fault/handle', { id, handleResult });
    }
}
