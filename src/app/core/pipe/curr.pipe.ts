import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'curr',
})
export class CurrPipe extends CurrencyPipe implements PipeTransform {
    transform(value: any, args?: any): any {

        let result;
        result = super.transform(value, args);
    
    
        return result.replaceAll('.00','').replaceAll('$','').replaceAll(',','.');
      }
}
