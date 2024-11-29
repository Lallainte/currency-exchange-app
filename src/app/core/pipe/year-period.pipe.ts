import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HelperService } from '@core/service/helper-service';

@Pipe({
    name: 'formatYearPeriod',
})
export class FormatYearPeriod extends DatePipe implements PipeTransform {
    constructor(private helperServ: HelperService) {
        super('en-US');
    }

    transform(value: any): any {
        let formated = '-';
        if (value) {
            const now = new Date();
            const date = new Date(value);

            const timeDiff = Math.floor(now.getTime() - date.getTime());
            const diffDays = timeDiff / (1000 * 3600 * 24);
            const years = Math.floor(diffDays / 365);

            return years;
        }
        return formated;
    }
}
