import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'spaceToComma',
})
export class SpaceToCommaPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        let data = value.split(' ').toString();
        if(data.charAt(data.length - 1)==","){
            data =data.substring(0, data.length - 1)
        }
        return data;
    }
}
