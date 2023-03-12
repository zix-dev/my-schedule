import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatMenuModule, MatDialogModule

  ],
  exports: [
    MatDatepickerModule, MatFormFieldModule, MatInputModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatMenuModule, MatDialogModule
  ]
})
export class AngularMaterialModule { }
