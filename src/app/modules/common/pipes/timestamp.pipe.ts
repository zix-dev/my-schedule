import { Timestamp } from 'firebase/firestore';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestamp'
})
export class TimestampPipe implements PipeTransform {

  transform(value: Timestamp): string {
    return value.toDate().toLocaleDateString()
  }

}
