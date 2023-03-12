import { TimeSelectorComponent } from './time-selector/time-selector.component';
import { Time } from '@angular/common';
import { Component, EventEmitter, forwardRef, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'time-box',
  templateUrl: './time-box.component.html',
  styleUrls: ['./time-box.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimeBoxComponent),
    multi: true
  }]
})
export class TimeBoxComponent implements ControlValueAccessor {


  @ViewChild('menuTrigger') menuTrigger?: MatMenuTrigger;
  private _value?: Time;

  constructor(public dialog: MatDialog) { }
  onTouched = () => { };
  onChange = () => { };
  public writeValue(val: Time): void {
    this._value = val
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  openDialog() {
    const dialogRef = this.dialog.open(TimeSelectorComponent, { restoreFocus: false });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger?.focus());
  }
}
