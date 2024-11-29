import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'emptyText',
})
export class EmptyTextPipe implements PipeTransform {
    transform(value: any, customText = '-'): any {
        if (value) {
            return value;
        }

        return customText;
    }
}
