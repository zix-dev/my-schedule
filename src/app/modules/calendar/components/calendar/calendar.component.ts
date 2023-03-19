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
  public reservations: Reservation[] = [];
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
    eventDrop: (e) => this.updateReservationFromEvent(e.event as CalendarEvent),
    eventResize: (e) => this.updateReservationFromEvent(e.event as CalendarEvent),
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
      this.reservations = reservations;
      this.events = reservations.map((res) => {
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
    const data = { reservation: res, creation: !update };
    this._popup.open(AppointmentEditionComponent, { data: data, width: '600px' }).beforeClosed().subscribe((response) => {
      if (response == null) return;
      const save = response as boolean;
      if (save == true) {
        if (data.reservation.title == '') data.reservation.title = 'sin nombre'
        if (update) this._db.update<Reservation>(data.reservation, 'reservations');
        else this._db.put<Reservation>(data.reservation, 'reservations');
      }
      else if (update) this._db.del(data.reservation, 'reservations')
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

  public updateReservationFromEvent(e: CalendarEvent): void {
    const res = { ...this.getReservation(e.id!) }
    const newRes = this.createNewResevation(e);
    res.day = newRes.day;
    res.start = newRes.start;
    res.end = newRes.end;
    this.updateReservation(res)
  }

  public createNewResevation(e: CalendarEvent): Reservation {
    if (e.end == null) {
      e.end = new Date(e.start);
      e.end.setDate(e.end.getDate() + 1)
    }
    return { title: e.title ?? '', day: Timestamp.fromDate(e.start!), start: dateToTime(e.start), end: dateToTime(e.end), color: '#cccccc', }

  }

  public getReservation(id: string): Reservation {
    return this.reservations.find(r => r.id == id)!;
  }
}

export type FullCalendar = Omit<FullCalendarComponent, 'calendar'> & { calendar: Calendar };
export type Calendar = { currentData: CalendarCurrentData }
export type CalendarCurrentData = { currentViewType: CalendarViewTypes; currentDate: Date };
export type CalendarViewTypes = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
export type CalendarEvent = { id?: string, title?: string, start: Date, end?: Date, color?: string; personalIds?: string[]; roomsIds?: string[]; machinesIds?: string[] };
