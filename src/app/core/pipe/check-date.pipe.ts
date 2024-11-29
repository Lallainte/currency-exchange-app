import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'checkDateValid',
})
export class CheckDateValidPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        let today = new Date().setHours(0,0,0);
        let date = new Date(value).setHours(0,0,0);
        return today >= date ? 'Tidak Aktif':'Aktif';
    }
}
