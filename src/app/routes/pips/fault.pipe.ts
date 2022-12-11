import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breakDown'
})
export class FaultPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        switch (value) {
            case 1: return '漏电传感器开路';
            case 2: return '漏电传感器短路';
            case 3: return 'CT1开路';
            case 4: return 'CT1短路';
            case 5: return 'CT2开路';
            case 6: return 'CT2短路';
            case 7: return 'CT3开路';
            case 8: return 'CT3短路';
            case 9: return 'A相温度传感器短路';
            case 10: return 'A相温度传感器断路';
            case 11: return 'B相温度传感器短路';
            case 12: return 'B相温度传感器断路';
            case 13: return 'C相温度传感器短路';
            case 14: return 'C相温度传感器断路';
            case 15: return '零序温度传感器短路';
            case 16: return '零序温度传感器断路';
            case 17: return 'A相过载';
            case 18: return 'B相过载';
            case 19: return 'C相过载';
            case 20: return '主电A相过压';
            case 21: return '主电B相过压';
            case 22: return '主电C相过压';
            case 23: return '主电A相缺相';
            case 24: return '主电B相缺相';
            case 25: return '主电C相缺相';
            case 26: return '主电A相欠压';
            case 27: return '主电B相欠压';
            case 28: return '主电C相欠压';
            case 29: return '主电错相';
            default:return value;
        }
    }

}
