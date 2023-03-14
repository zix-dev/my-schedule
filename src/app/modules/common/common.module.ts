import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import * as Pipes from './pipes/index';
import * as Components from './components/index';


@NgModule({
  declarations: [
    Components.TimeRangeSelectorComponent,
    Pipes.TimeStringPipe,
  ],
  imports: [
    AngularCommonModule,
  ],
  exports: [
    Components.TimeRangeSelectorComponent,
    Pipes.TimeStringPipe
  ]
})
export class CommonModule { }
