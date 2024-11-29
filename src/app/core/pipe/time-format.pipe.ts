import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'formatTime',
})
export class FormatTimePipe extends DatePipe implements PipeTransform {
    constructor() {
        super('en-US');
    }

    transform(value: any): any {
        let formated = '-';

        if (value && value != '-') {
            let format = 'HH:mm';
            let date = new Date('2022/01/01 ' + value + ' GMT+0700');

            return (formated = super.transform(date, format));
        } else {
            return '-';
        }
    }
}
