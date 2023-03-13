import { BasicModule } from './../basic/basic.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from './components/index'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [Components.GeneralConfigurationComponent],
  imports: [
    CommonModule,
    BasicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [Components.GeneralConfigurationComponent]
})
export class ConfigurationModule { }
