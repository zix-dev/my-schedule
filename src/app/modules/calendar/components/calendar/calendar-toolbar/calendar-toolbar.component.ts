import { Component, Input } from '@angular/core';
import { Calendar } from '@fullcalendar/core';

@Component({
  selector: 'calendar-toolbar',
  templateUrl: './calendar-toolbar.component.html',
  styleUrls: ['./calendar-toolbar.component.scss'],
})
export class CalendarToolbarComponent {
  @Input() public calendar!: Calendar;
}
