import { Reservation } from './../../../common/models/reservation.models';
import { AppointmentEditionComponent } from './../appointment-edition/appointment-edition.component';
import { PopupService } from './../../../basic/services/popup.service';
import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'
import { FullCalendarComponent } from '@fullcalendar/angular/full-calendar.component';
import { dateToTime, timeToDate } from 'src/app/modules/common/utils/date-and-time.utils';
import { EventImpl } from '@fullcalendar/core/internal';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @ViewChild('calendar') public calendar!: FullCalendar;
  public events: CalendarEvent[] = [];
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
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true
  };

  public constructor(private _popup: PopupService) { }

  public select(e: DateSelectArg): void {
    if (this.calendar.calendar.currentData.currentViewType != 'dayGridMonth') this.addEvent(e)
  }

  public addEvent(e: DateSelectArg): void {
    if (e.end.getDate() != e.start.getDate()) return;
    const data: Reservation = { title: '', day: e.start, start: dateToTime(e.start), end: dateToTime(e.end) }
    this.openEventEditor(data);
  }

  public editEvent(e: EventImpl): void {
    const data: Reservation = { title: e.title, day: e.start!, start: dateToTime(e.start!), end: dateToTime(e.end!) }
    this.openEventEditor(data);
  }

  public openEventEditor(res: Reservation): void {
    this._popup.open(AppointmentEditionComponent, { data: res, width: '400px' }).beforeClosed().subscribe(() => {
      const newEvent = {
        title: res.title.trim() == '' ? 'sin título' : res.title,
        color: '#55b995',
        start: timeToDate(res.start, res.day),
        end: timeToDate(res.end, res.day)
      }

      this.events = this.events.concat(newEvent)
      this.options = { ...this.options, ...{ events: this.events } }
    })
  }
}

export type FullCalendar = Omit<FullCalendarComponent, 'calendar'> & { calendar: Calendar };
export type Calendar = { currentData: CalendarCurrentData }
export type CalendarCurrentData = { currentViewType: CalendarViewTypes; currentDate: Date };
export type CalendarViewTypes = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
export type CalendarEvent = { title: string, start: Date, end: Date, color: string };
