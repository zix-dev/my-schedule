import { Component, Input } from '@angular/core';
import { Reservation } from 'src/app/modules/common/models/reservation.models';
import { ReservationService } from '../../../services/reservation.service';
import { CalendarEvent } from '../../calendar/calendar.component';

@Component({
  selector: 'minimal-reservation-tile',
  templateUrl: './minimal-reservation-tile.component.html',
  styleUrls: ['./minimal-reservation-tile.component.scss'],
})
export class MinimalReservationTileComponent {
  public reservation!: Reservation;
  private _event!: CalendarEvent;
  public get event(): CalendarEvent {
    return this._event;
  }
  @Input() public set event(e: CalendarEvent) {
    this._event = e;
    this.reservation = this._db.reservations.find(
      (r) => r.id == this.event.id
    )!;
  }
  public constructor(private _db: ReservationService) {}
}
