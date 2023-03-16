import { CommonModule } from './../common/common.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import * as Components from './components/index'


@NgModule({
  declarations: [
    Components.AppointmentEditionComponent,
    Components.CalendarComponent,
  ],
  imports: [
    AngularCommonModule,
    FullCalendarModule,
    CommonModule
  ],
  exports: [
    Components.AppointmentEditionComponent, Components.CalendarComponent]
})
export class CalendarModule { }
