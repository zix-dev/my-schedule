import { Pipe, PipeTransform } from '@angular/core';
import { getContrastColor } from '../utils/random.utils';

@Pipe({
  name: 'contrast',
})
export class ContrastPipe implements PipeTransform {
  transform(value: string): string {
    return getContrastColor(value);
  }
}
