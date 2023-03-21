import { dateToTime } from 'src/app/modules/common/utils/date-and-time.utils';
import { Time } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { timeToString } from '../utils/date-and-time.utils';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {

  transform(value?: Time | Date): string | undefined {
    const date = value as Date;
    if (date.getDate != null) value = dateToTime(date)
    return timeToString(value as Time)
  }

}
