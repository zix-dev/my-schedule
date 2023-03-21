import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullOrEmpty'
})
export class NullOrEmptyPipe implements PipeTransform {

  transform(string: string): boolean {
    return nullOrEmpty(string)
  }

}

export function nullOrEmpty(string?: string): boolean {
  return string == null || string.trim() == '';
}
