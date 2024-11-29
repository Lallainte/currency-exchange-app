import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertInputArrayToString',
})
export class convertInputArrayPipe implements PipeTransform {
    transform(data, label = 'value') {
        const values = data.map((obj) => obj[label]);

        return values.join('');
    }
}
