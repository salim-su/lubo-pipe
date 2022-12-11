import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'alarm',
})
export class AlarmPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        switch (value) {
            case 1:
                return '漏电报警';
            case 2:
                return 'A相温度报警';
            case 3:
                return 'B相温度报警';
            case 4:
                return 'C相温度报警';
            case 5:
                return '零序温度报警';
            case 6:
                return '火灾报警';
            default:
                return value;
        }
    }

}
