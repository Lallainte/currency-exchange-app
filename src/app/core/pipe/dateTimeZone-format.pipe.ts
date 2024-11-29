import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'formatDateTimeZone',
})
export class FormatDateTimeZonePipe extends DatePipe implements PipeTransform {
    constructor() {
        // super(authService.getSession().locale);
        super('en-US');
    }

    transform(value: any, haveTime?: any, dateDay?: any): any {
        let format = 'dd-MMM-yy';
        if (haveTime) {
            format = 'dd-MMM-yy HH:mm';
        }
        if (dateDay) {
            format = 'EEEE, dd LLLL yyyy HH:mm';
        }
        if (value && value != '-') {
            if (value instanceof Date) {
            } else {
                value = value.replaceAll('-', '/');
            }

            let b: any;
            if (value instanceof Date) {
                b = value;
            } else {
                b = new Date((value += haveTime ? ' GMT+0000' : ''));
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
