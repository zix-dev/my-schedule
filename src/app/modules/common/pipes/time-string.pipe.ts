import { timeToString } from 'src/app/modules/common/utils/date-and-time.utils';
import { Time } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {

  transform(value?: Time): string | undefined {
    return timeToString(value)
  }

}
