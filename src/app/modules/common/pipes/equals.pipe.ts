import { isEqual } from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'equals'
})
export class EqualsPipe implements PipeTransform {

  transform<T>(value1: T, value2: T): boolean {
    return isEqual(value1, value2);
  }

}
