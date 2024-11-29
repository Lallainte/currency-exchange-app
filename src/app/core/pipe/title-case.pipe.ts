import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'titleCase',
})
export class TitleCasePipe implements PipeTransform {
    transform(value: string): string {
        value = value?.toLowerCase();
        let first = value?.substring(0, 1)?.toUpperCase();
        return first + value?.substring(1);
    }
}
