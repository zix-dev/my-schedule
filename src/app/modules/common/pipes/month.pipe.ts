import { Pipe, PipeTransform } from '@angular/core';
import { MONTH_NAMES } from '../utils/date-and-time.utils';

@Pipe({
  name: 'month',
})
export class MonthPipe implements PipeTransform {
  public transform(date: Date | undefined): string {
    if (date == undefined) return '';
    return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
  }
}
