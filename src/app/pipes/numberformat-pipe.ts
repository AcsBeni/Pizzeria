import { Pipe, PipeTransform } from '@angular/core';
import { isInNotificationPhase } from '@angular/core/primitives/signals';

@Pipe({
  name: 'numberformat',
  standalone:true
})
export class NumberformatPipe implements PipeTransform {

  transform(value: number |string |null|undefined,
    decimalPlaces: number =0, 
    locale: string ='hu-Hu'): string 
  {
    if(value===null || value===undefined|| isNaN(Number(value))){
      return '-';
    }
    return new Intl.NumberFormat(locale,{
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits:decimalPlaces,
      useGrouping:true
    }).format(Number(value));
  }

}
