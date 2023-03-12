import { AngularMaterialModule } from './../externals/angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from './components/index'


@NgModule({
  declarations: [
    Components.TimeBoxComponent,
    Components.TimeSelectorComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [Components.TimeBoxComponent]
})
export class BasicModule { }
