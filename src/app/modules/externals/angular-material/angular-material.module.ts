import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDialogModule,
    MatTooltipModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule
  ]
})
export class AngularMaterialModule { }
