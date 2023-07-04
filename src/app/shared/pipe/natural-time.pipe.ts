import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'naturalTime'
})
export class NaturalTimePipe implements PipeTransform {

  transform(value: string| Date): string {
    if(!value){  return ''};

    const date = typeof value === 'string' ?  new Date(value) : value;
    return formatDistanceToNow(new Date(value),{addSuffix:true,locale: es});
  }

}
