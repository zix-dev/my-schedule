import { BasicModule } from './../basic/basic.module';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import * as Pipes from './pipes/index';


@NgModule({
  declarations: [
    Pipes.TimeStringPipe,
  ],
  imports: [
    AngularCommonModule, BasicModule
  ],
  exports: [
    Pipes.TimeStringPipe,
    BasicModule
  ]
})
export class CommonModule { }
