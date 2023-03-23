import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { DateRange, MatCalendar } from '@angular/material/datepicker';
import { isEqual } from 'lodash';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @ViewChild('cal') public calendar!: MatCalendar<Date>;
  @Input() public selectedDates: Date[] = [];
  public dateClass: (date: Date) => string = (date) => {
    if (this.selectedDates.some((d) => isEqual(d, date)))
      return 'selected-date';
    return '';
  };
  public generalValue: Date | DateRange<Date> | null = null;
  @Input() public set value(d: Date | undefined) {
    this.generalValue = d ?? null;
    this.refresh();
  }
  public get value(): Date | undefined {
    return this.generalValue as Date;
  }

  @Input() public set currentDate(date: Date) {
    this.calendar?._goToDateInView(date, 'month');
    setTimeout(() => {
      this.calendar._goToDateInView(date, 'month');
    }, 200);
  }
  @Output() public readonly valueChange = new EventEmitter<Date>();

  public valueChanged(val: Date | DateRange<Date> | null): void {
    this.valueChange.emit(val as Date);
    this.refresh();
  }

  public refresh(): void {
    this.calendar?.updateTodaysDate();
  }
}
