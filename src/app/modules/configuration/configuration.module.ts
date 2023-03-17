import { BasicModule } from './../basic/basic.module';
import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import * as Components from './components/index'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../common/common.module';


@NgModule({
  declarations: [Components.GeneralConfigurationComponent],
  imports: [
    AngularCommonModule,
    BasicModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [Components.GeneralConfigurationComponent]
})
export class ConfigurationModule { }
