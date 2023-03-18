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
import listPlugin from '@fullcalendar/list'
import { FullCalendarComponent } from '@fullcalendar/angular/full-calendar.component';
import { dateToTime, timeToDate } from 'src/app/modules/common/utils/date-and-time.utils';
import { EventImpl } from '@fullcalendar/core/internal';
import { Timestamp } from 'firebase/firestore';
@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnDestroy {
  /**
   * Calendar component ref
   */
  @ViewChild('calendar') public calendar!: FullCalendar;
  /**
   * Array of events
   */
  public events: CalendarEvent[] = [];
  /**
   * Calendar options
   */
  public options: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    initialDate: new Date(),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    events: this.events,
    select: (e) => this.select(e),
    eventClick: (e) => this.editEvent(e.event),
    eventDrop: (e) => this.updateReservation(eventToReservation(e.event as CalendarEvent)),
    eventResize: (e) => this.updateReservation(eventToReservation(e.event as CalendarEvent)),
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true
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
      this.events = reservations.map((res) => {
        const day = res.day.toDate()!;
        return {
          title: res.title,
          color: '#55b995',
          start: timeToDate(res.start, day),
          end: timeToDate(res.end, day),
          id: res.id
        }
      })
      this.options = { ...this.options, ...{ events: this.events } };
    })
  }
  /**
   * Called when there have been a selection in the calendar
   */
  public select(e: DateSelectArg): void {
    if (this.calendar.calendar.currentData.currentViewType != 'dayGridMonth') this.addEvent(e)
  }
  /**
   * Adds a new event to the calendar
   */
  public addEvent(e: DateSelectArg): void {
    if (e.end.getDate() != e.start.getDate()) return;
    const data: Reservation = { title: '', day: Timestamp.fromDate(e.start!), start: dateToTime(e.start), end: dateToTime(e.end) }
    this.openEventEditor(data);
  }
  /**
   * Edits an event
   */
  public editEvent(e: EventImpl): void {
    this.openEventEditor(eventToReservation(e as CalendarEvent), true);
  }
  /**
   * Opens event editor
   */
  public openEventEditor(res: Reservation, update: boolean = false): void {
    this._popup.open(AppointmentEditionComponent, { data: res, width: '600px' }).beforeClosed().subscribe(() => {
      if (update) this._db.update(res, 'reservations');
      else this._db.put<Reservation>(res, 'reservations')
    })
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
}

export type FullCalendar = Omit<FullCalendarComponent, 'calendar'> & { calendar: Calendar };
export type Calendar = { currentData: CalendarCurrentData }
export type CalendarCurrentData = { currentViewType: CalendarViewTypes; currentDate: Date };
export type CalendarViewTypes = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
export type CalendarEvent = { id?: string, title: string, start: Date, end?: Date, color?: string };

export function eventToReservation(e: CalendarEvent): Reservation {
  const end = dateToTime(e.end ?? e.start);
  if (e.end == null) end.hours++;
  return {
    id: e.id,
    day: Timestamp.fromDate(e.start),
    start: dateToTime(e.start),
    end: end,
    title: e.title ?? 'sin título'
  };
}
