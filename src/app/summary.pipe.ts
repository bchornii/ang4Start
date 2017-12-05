import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'summary'
})
export class SummaryPipe implements PipeTransform {
    transform(value: string, limit: number, another?: boolean) {
        if(!value){
            return null;
        }
        let actLimit = another ? limit : 50;
        return value.substring(0, actLimit) + '...';
    }    
}