import { Time } from '@angular/common';
import { Timestamp } from 'firebase/firestore';


export type Reservation = {
  id?: string,
  title: string;
  start: Time;
  end: Time;
  day: Timestamp;
  color: string;
  personalIds?: string[];
  roomsIds?: string[];
  machinesIds?: string[];
}
