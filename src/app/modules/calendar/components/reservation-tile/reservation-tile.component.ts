import { CalendarEvent } from './../calendar/calendar.component';
import { Reservation } from './../../../common/models/reservation.models';
import { ConfigService } from './../../../configuration/services/config.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'reservation-tile',
  templateUrl: './reservation-tile.component.html',
  styleUrls: ['./reservation-tile.component.scss']
})
export class ReservationTileComponent implements OnChanges {

  @Input() public reservation!: Reservation;
  @Input() public event!: CalendarEvent;

  public constructor(private _config: ConfigService) { }

  public ngOnChanges(): void {

  }

}
