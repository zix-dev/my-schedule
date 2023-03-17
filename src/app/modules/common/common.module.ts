import { BasicModule } from './../basic/basic.module';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import * as Pipes from './pipes/index';


@NgModule({
  declarations: [
    Pipes.TimePipe,
    Pipes.TimestampPipe,
  ],
  imports: [
    AngularCommonModule, BasicModule
  ],
  exports: [
    Pipes.TimePipe,
    Pipes.TimestampPipe,
    BasicModule
  ]
})
export class CommonModule { }
