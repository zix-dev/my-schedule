import { ReservationService } from './../services/reservation.service';
import { Reservation } from './../../common/models/reservation.models';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reservation'
})
export class ReservationPipe implements PipeTransform {

  public constructor(private _reservationService: ReservationService) { }

  public transform(id: string): Reservation {
    return this._reservationService.get(id);
  }

}
