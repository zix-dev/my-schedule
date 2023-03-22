import { BasicModule } from './../basic/basic.module';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import * as Pipes from './pipes/index';
import * as Components from './components/index';

@NgModule({
  declarations: [
    Pipes.TimePipe,
    Pipes.TimestampPipe,
    Components.SidebarComponent,
    Components.ScrollComponent,
    Pipes.NullOrEmptyPipe,
    Pipes.MonthPipe,
    Pipes.ContrastPipe,
  ],
  imports: [AngularCommonModule, BasicModule],
  exports: [
    Pipes.TimePipe,
    Pipes.TimestampPipe,
    Pipes.NullOrEmptyPipe,
    Components.SidebarComponent,
    Components.ScrollComponent,
    Pipes.MonthPipe,
    Pipes.ContrastPipe,
    BasicModule,
  ],
})
export class CommonModule {}
