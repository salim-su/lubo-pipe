import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ArrayService } from '@delon/util';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthDictService {

    constructor(
        private arraySrv: ArrayService,
        private httpClient: _HttpClient,
    ) {
    }

    list(params) {
        return this.httpClient.get('blade-system/dict/child-list', params).pipe(
            map(item => {
                console.log(item);
                // tslint:disable-next-line:no-shadowed-variable
                this.arraySrv.visitTree(item, (item) => {
                    item.value = item.dictKey;
                    item.label = item.dictValue;
                    item.isLeaf = !item.children || item.children.length === 0;
                });
                return item;
            }),
        );
    }
    parentList(params) {
        return this.httpClient.get('blade-system/dict/parent-list', params);
    }

    parentListBiz(params) {
        return this.httpClient.get('blade-system/dict-biz/parent-list', params);
    }

    childList(params) {
        return this.httpClient.get('blade-system/dict/child-list', params).pipe(
            map(item => {
                // tslint:disable-next-line:no-shadowed-variable
                this.arraySrv.visitTree(item, (item) => {
                    item.key = item.id;
                    item.isLeaf = item.children === undefined || item.children.length === 0;
                });
                return item;
            }),
        );
    }

    childListBiz(params) {
        return this.httpClient.get('blade-system/dict-biz/child-list', params).pipe(
            map(item => {
                // tslint:disable-next-line:no-shadowed-variable
                this.arraySrv.visitTree(item, (item) => {
                    item.key = item.id;
                    item.isLeaf = item.children === undefined || item.children.length === 0;
                });
                return item;
            }),
        );
    }

    submit(data) {
        return this.httpClient.post('blade-system/dict/submit', data);
    }

    submitBiz(data) {
        return this.httpClient.post('blade-system/dict-biz/submit', data);
    }

    remove(ids: string) {
        return this.httpClient.post('blade-system/dict/remove?ids=' + ids);
    }

    removeBiz(ids: string) {
        return this.httpClient.post('blade-system/dict-biz/remove?ids=' + ids);
    }

    changeIsSealed(ids, isSealed) {
        return this.httpClient.post('blade-system/dict/changeIsSealed?ids=' + ids + '&isSealed=' + isSealed);
    }

    changeIsSealedBiz(ids, isSealed) {
        return this.httpClient.post('blade-system/dict-biz/changeIsSealed?ids=' + ids + '&isSealed=' + isSealed);
    }

    dictionary(code) {
        return this.httpClient.get('blade-system/dict/dictionary', code);
    }
    dictionaryBiz(code) {
        return this.httpClient.get('blade-system/dict-biz/dictionary', code);
    }
}

