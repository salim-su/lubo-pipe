import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filtrate',
})
export class FiltratePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        switch (value.categoryCode) {

            case 1:
                return value.jsonData.channels[0].data.leakage + 'mA';
            case 2:
                return value.jsonData.channels[0].data.aTemperature + '℃';
            case 3:
                return value.jsonData.channels[0].data.bTemperature + '℃';
            case 4:
                return value.jsonData.channels[0].data.cTemperature + '℃';
            case 5:
                return value.jsonData.channels[0].data.nTemperature + '℃';
            case 20:
                return value.jsonData.channels[0].data.aVoltage + 'V';
            case 21:
                return value.jsonData.channels[0].data.bVoltage + 'V';
            case 22:
                return value.jsonData.channels[0].data.cVoltage + 'V';
            case 26:
                return value.jsonData.channels[0].data.aVoltage + 'V';
            case 27:
                return value.jsonData.channels[0].data.bVoltage + 'V';
            case 28:
                return value.jsonData.channels[0].data.cVoltage + 'V';
            case 17:
                return value.jsonData.channels[0].data.aElectricity + 'mA';
            case 18:
                return value.jsonData.channels[0].data.bElectricity + 'mA';
            case 19:
                return value.jsonData.channels[0].data.cElectricity + 'mA';
            case 23:
                return 'A相缺相';
            case 24:
                return 'B相缺相';
            case 25:
                return 'C相缺相';
            default:
                return value;
        }



    }
}
