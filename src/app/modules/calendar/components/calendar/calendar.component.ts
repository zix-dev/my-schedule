import { MONTH_NAMES } from './../../../common/utils/date-and-time.utils';
import { Subscription } from 'rxjs';
import { Reservation } from './../../../common/models/reservation.models';
import { AppointmentEditionComponent } from './../appointment-edition/appointment-edition.component';
import { PopupService } from './../../../basic/services/popup.service';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  DayHeaderContentArg,
} from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarComponent } from '@fullcalendar/angular/full-calendar.component';
import { EventImpl } from '@fullcalendar/core/internal';
import { Timestamp } from 'firebase/firestore';
import {
  dateToTime,
  getDayHeader,
  getDayMonthHeader,
  getDayWeekHeader,
  isLater,
  timeToDate,
} from 'src/app/modules/common/utils/date-and-time.utils';
import { ReservationService } from '../../services/reservation.service';
@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
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
    eventResize: (e) =>
      this.updateReservationFromEvent(e.event as CalendarEvent),
    dateClick: (e) => {
      if (
        this.calendar.getApi().getCurrentData().currentViewType ==
        'dayGridMonth'
      )
        this.calendar.getApi().changeView('timeGridDay', e.date);
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    allDaySlot: false,
    dayMaxEvents: true,
    dayHeaderContent: (e) => this._generateHeader(e),
    slotLabelContent: (e) => {
      let hour = e.date.getHours();
      if (hour == 0 || hour == 12) hour += 12;
      if (hour > 12) return `${hour - 12} PM`;
      return `${hour} AM`;
    },
    moreLinkContent: (e) => `+${e.num} más`,
  };
  /**
   * Subscription array
   */
  private _subs: Subscription[] = [];
  /**
   * On the constructor subscribes to the db changes to update the calendar
   */
  public constructor(
    private _popup: PopupService,
    private _db: ReservationService
  ) {
    this._db.reservationsChanged.subscribe(() => this.mapReservations());
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
    const data: Reservation = {
      title: '',
      day: Timestamp.fromDate(e.start!),
      start: dateToTime(e.start),
      end: dateToTime(e.end),
      color: '#cccccc',
    };
    this.openEventEditor(data);
  }
  /**
   * Edits an event
   */
  public editEvent(e: EventImpl): void {
    this.openEventEditor(this._db.get(e.id), true);
  }
  /**
   * Opens event editor
   */
  public openEventEditor(res: Reservation, update: boolean = false): void {
    const data = { reservation: res, creation: !update };
    this._popup
      .open(AppointmentEditionComponent, { data: data, width: '600px' })
      .beforeClosed()
      .subscribe(() => this.calendar.getApi().unselect());
  }
  /**
   * On destroy removes subscription
   */
  public ngOnDestroy(): void {
    this._subs.forEach((sub) => sub.unsubscribe());
  }

  public updateReservationFromEvent(e: CalendarEvent): void {
    const res = { ...this._db.get(e.id!) };
    const newRes = this.createNewResevation(e);
    if (e.allDay || isLater(newRes.start, newRes.end)) {
      this.mapReservations();
      return;
    }
    res.day = newRes.day;
    res.start = newRes.start;
    res.end = newRes.end;
    const promise = this._db.update(res);
    if (promise == null) this.mapReservations();
  }

  public createNewResevation(e: CalendarEvent): Reservation {
    let end = e.end;
    if (end == null) {
      end = new Date(e.start);
      end.setDate(end.getDate() + 1);
    }
    return {
      title: e.title ?? '',
      day: Timestamp.fromDate(e.start!),
      start: dateToTime(e.start),
      end: dateToTime(end),
      color: '#cccccc',
    };
  }

  public mapReservations(): void {
    this.events = this._db.reservations.map((res) => {
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
      };
    });
    this.options = { ...this.options, ...{ events: this.events } };
  }

  public generateYearHeader(date: Date) {
    return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
  }

  private _generateHeader(e: DayHeaderContentArg): string {
    switch (e.view.type) {
      case 'dayGridMonth':
        return getDayMonthHeader(e.date);
      case 'timeGridWeek':
        return getDayWeekHeader(e.date);
      default:
        return getDayHeader(e.date);
    }
  }
}

export type CalendarEvent = {
  id?: string;
  title?: string;
  start: Date;
  end?: Date;
  color?: string;
  allDay?: boolean;
};
