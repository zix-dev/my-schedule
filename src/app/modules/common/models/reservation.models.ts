import { Employee, Room, Machine } from './../../configuration/models/configurations.models';
import { Time } from '@angular/common';
import { Timestamp } from 'firebase/firestore';


export type Reservation = {
  id?: string,
  title: string;
  start: Time;
  end: Time;
  day: Timestamp;
  employee?: Employee;
  room?: Room;
  machine?: Machine;
}
