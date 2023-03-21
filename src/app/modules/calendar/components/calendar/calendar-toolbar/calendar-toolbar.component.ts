import { FullCalendarComponent } from '@fullcalendar/angular/full-calendar.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'calendar-toolbar',
  templateUrl: './calendar-toolbar.component.html',
  styleUrls: ['./calendar-toolbar.component.scss']
})
export class CalendarToolbarComponent {
  @Input() public calendar!: FullCalendarComponent;
}
