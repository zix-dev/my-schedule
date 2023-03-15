import { FullCalendarModule } from '@fullcalendar/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from './components/index'


@NgModule({
  declarations: [
    Components.CalendarComponent,
  ],
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  exports: [Components.CalendarComponent]
})
export class CalendarModule { }
