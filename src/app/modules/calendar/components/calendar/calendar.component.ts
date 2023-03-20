import { Subscription } from 'rxjs';
import { DatabaseService } from './../../../../database.service';
import { Reservation } from './../../../common/models/reservation.models';
import { AppointmentEditionComponent } from './../appointment-edition/appointment-edition.component';
import { PopupService } from './../../../basic/services/popup.service';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular/full-calendar.component';
import { EventImpl } from '@fullcalendar/core/internal';
import { Timestamp } from 'firebase/firestore';
import { reservationOverlaps } from '../../utils/reservation.utils';
import { dateToTime, isLater, timeToDate } from 'src/app/modules/common/utils/date-and-time.utils';
@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnDestroy {
  /**
   * Calendar component ref
   */
  @ViewChild('calendar') public calendar!: FullCalendarComponent;
  /**
   * Array of events
   */
  public events: CalendarEvent[] = [];
  /**
   * Array of reservations
   */
  public reservations: Reservation[] = [];
  /**
   * Calendar options
   */
  public options: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialDate: new Date(),
    headerToolbar: false,
    initialView: 'dayGridMonth',
    events: this.events,
    select: (e) => this.select(e),
    eventClick: (e) => this.editEvent(e.event),
    eventDrop: (e) => this.updateReservationFromEvent(e.event as CalendarEvent),
    eventResize: (e) => this.updateReservationFromEvent(e.event as CalendarEvent),
    dateClick: (e) => this.calendar.getApi().changeView('timeGridDay', e.date),
    editable: true,
    selectable: true,
    selectMirror: true,
    allDaySlot: false,
    dayMaxEvents: true,
  };
  /**
   * Subscription array
   */
  private _subs: Subscription[] = [];
  /**
   * On the constructor subscribes to the db changes to update the calendar
   */
  public constructor(private _popup: PopupService, private _db: DatabaseService) {
    this._db.get<Reservation>('reservations').subscribe(reservations => {
      this.reservations = reservations;
      this.mapReservations();
    })
  }
  /**
   * Called when there have been a selection in the calendar
   */
  public select(e: DateSelectArg): void {
    if (this.calendar.getApi().view.type != 'dayGridMonth') this.addEvent(e);
  }
  /**
   * Adds a new event to the calendar
   */
  public addEvent(e: DateSelectArg): void {
    if (e.end.getDate() != e.start.getDate()) return;
    const data: Reservation = { title: '', day: Timestamp.fromDate(e.start!), start: dateToTime(e.start), end: dateToTime(e.end), color: '#cccccc' }
    this.openEventEditor(data);
  }
  /**
   * Edits an event
   */
  public editEvent(e: EventImpl): void {
    this.openEventEditor(this.getReservation(e.id), true);
  }
  /**
   * Opens event editor
   */
  public openEventEditor(res: Reservation, update: boolean = false): void {
    const data = { reservation: res, creation: !update, reservations: this.reservations };
    this._popup.open(AppointmentEditionComponent, { data: data, width: '600px' }).beforeClosed().subscribe(() =>
      this.calendar.getApi().unselect()
    )
  }
  /**
   * Updates a reservation
   */
  public updateReservation(reservation: Reservation): void {
    this._db.update(reservation, 'reservations');
  }
  /**
   * On destroy removes subscription
   */
  public ngOnDestroy(): void {
    this._subs.forEach(sub => sub.unsubscribe())
  }

  public updateReservationFromEvent(e: CalendarEvent): void {
    const res = { ...this.getReservation(e.id!) }
    const newRes = this.createNewResevation(e);
    if (e.allDay || isLater(newRes.start, newRes.end)) {
      this.mapReservations();
      return;
    }
    res.day = newRes.day;
    res.start = newRes.start;
    res.end = newRes.end;
    this.updateReservation(res)
  }

  public createNewResevation(e: CalendarEvent): Reservation {
    let end = e.end;
    if (end == null) {
      end = new Date(e.start);
      end.setDate(end.getDate() + 1)
    }
    return { title: e.title ?? '', day: Timestamp.fromDate(e.start!), start: dateToTime(e.start), end: dateToTime(end), color: '#cccccc', }

  }

  public mapReservations(): void {
    this.events = this.reservations.map((res) => {
      const day = res.day.toDate()!;
      return {
        title: res.title,
        color: res.color,
        start: timeToDate(res.start, day),
        end: timeToDate(res.end, day),
        id: res.id,
        personalIds: res.personalIds,
        roomsIds: res.roomsIds,
        machinesIds: res.machinesIds,
      }
    });
    this.options = { ...this.options, ...{ events: this.events } };
  }

  public getReservation(id: string): Reservation {
    return this.reservations.find(r => r.id == id)!;
  }
}

export type CalendarEvent =
  {
    id?: string,
    title?: string,
    start: Date,
    end?: Date,
    color?: string;
    personalIds?: string[];
    roomsIds?: string[];
    machinesIds?: string[];
    allDay?: boolean
  };
