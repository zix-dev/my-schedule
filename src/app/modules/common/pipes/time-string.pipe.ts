import { timeToString } from 'src/app/modules/common/utils/date-and-time.utils';
import { Time } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeString',
  pure: false
})
export class TimeStringPipe implements PipeTransform {

  transform(value?: Time): string | undefined {
    return timeToString(value)
  }

}
