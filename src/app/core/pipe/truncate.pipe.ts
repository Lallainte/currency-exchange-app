import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, args = 10): string {
        if (value) {
            if(args == -1){
                return value;
            } else if (value.length > args) {
                return value.substring(0, args) + '...';
            } else {
                return value;
            }
        }
        else {
            return '-'
        }
    }
}

