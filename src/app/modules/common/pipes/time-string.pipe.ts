import { Time } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { timeToString } from '../utils/date-and-time.utils';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {

  transform(value?: Time): string | undefined {
    return timeToString(value)
  }

}
