import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'formatDate',
})
export class FormatDatePipe extends DatePipe implements PipeTransform {
    constructor() {
        super('en-US');
    }

    transform(value: any, haveTime?: any): any {
        let format = 'dd-MMM-yy';
        if (haveTime) {
            format = 'dd-MMM-yy HH:mm';
        }
        if (value && value != '-') {
            let b: any;
            if (value instanceof Date) {
                b = value;
            } else if (value.includes('T')) {
                b = new Date(value);
            } else {
                b = new Date(value + ' 00:00:00');
            }
            if (b.getFullYear() === 9999) {
                return '-';
            } else {
                return super.transform(b, format);
            }
        } else {
            return '-';
        }
    }
}
