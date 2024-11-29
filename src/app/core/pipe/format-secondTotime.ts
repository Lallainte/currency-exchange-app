import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'formatSecondToTIme',
})
export class FormatSecondToTIme extends DatePipe implements PipeTransform {
    constructor() {
        super('en-US');
    }

    transform(value: any, clockFormat?: any): any {
        if (value && value != '-') {
            const result = new Date(value * 1000).toISOString().slice(11, 19);
            let split = result.split(':');
            return clockFormat
                ? split[0] + ':' + split[1]
                : split[0] +
                      ' hour(s) ' +
                      split[1] +
                      ' minute(s) ' +
                      split[2] +
                      ' second(s)';
        } else {
            return '-';
        }
    }
}
