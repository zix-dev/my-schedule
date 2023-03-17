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
  ],
  imports: [
    AngularCommonModule, BasicModule
  ],
  exports: [
    Pipes.TimePipe,
    Pipes.TimestampPipe,
    Components.SidebarComponent,
    BasicModule
  ]
})
export class CommonModule { }
