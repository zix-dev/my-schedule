import { AngularMaterialModule } from './../externals/angular-material/angular-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Components from './components/index';

@NgModule({
  declarations: [
    Components.TimeBoxComponent,
    Components.NumberBoxComponent,
    Components.TextBoxComponent,
    Components.BtnComponent,
    Components.AutocompleteComponent,
    Components.ColorBoxComponent,
    Components.MultiselectionComponent,
    Components.DialogComponent,
    Components.LoadingPanelComponent,
    Components.DatePickerComponent,
  ],
  imports: [CommonModule, AngularMaterialModule],
  exports: [
    Components.TimeBoxComponent,
    Components.NumberBoxComponent,
    Components.TextBoxComponent,
    Components.BtnComponent,
    Components.AutocompleteComponent,
    Components.ColorBoxComponent,
    Components.MultiselectionComponent,
    Components.DatePickerComponent,
  ],
})
export class BasicModule {}
