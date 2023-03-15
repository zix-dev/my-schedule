import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list'
import { FullCalendarComponent } from '@fullcalendar/angular/full-calendar.component';
import { EventDef } from '@fullcalendar/core/internal';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') public calendar!: FullCalendar;
  public events: (EventDef | any)[] = [];
  public options: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    initialDate: new Date(),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'timeGridWeek',
    events: this.events,
    select: (e) => this.select(e),
    editable: true,
    selectable: true,
    selectMirror: false,
    dayMaxEvents: true
  };


  public ngOnInit(): void {

  }

  public select(e: DateSelectArg): void {
    if (this.calendar.calendar.currentData.currentViewType != 'dayGridMonth') this.addEvent(e)
  }

  public addEvent(e: DateSelectArg): void {
    if (e.end.getDate() != e.start.getDate()) return;
    this.events = this.events.concat({ ...{ title: 'x', color: '#ff0000' }, ...e })
    this.options = { ...this.options, ...{ events: this.events } }
  }

  public l(a: any): any {
    console.log(a);
    return a;
  }
}

export type FullCalendar = Omit<FullCalendarComponent, 'calendar'> & { calendar: Calendar };
export type Calendar = { currentData: CalendarCurrentData }
export type CalendarCurrentData = { currentViewType: CalendarViewTypes; currentDate: Date };
export type CalendarViewTypes = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay';
