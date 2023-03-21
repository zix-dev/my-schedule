import { ReservationService } from './../../services/reservation.service';
import { CalendarEvent } from './../calendar/calendar.component';
import { Reservation } from './../../../common/models/reservation.models';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'reservation-tile',
  templateUrl: './reservation-tile.component.html',
  styleUrls: ['./reservation-tile.component.scss']
})
export class ReservationTileComponent {

  public reservation!: Reservation;
  private _event!: CalendarEvent;
  public get event(): CalendarEvent {
    return this._event;
  }
  @Input() public set event(e: CalendarEvent) {
    this._event = e;
    this.reservation = this._db.reservations.find(r => r.id == this.event.id)!;
  }
  public constructor(private _db: ReservationService) { }

}
