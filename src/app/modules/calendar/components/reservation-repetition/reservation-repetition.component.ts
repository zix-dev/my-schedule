import { DatePickerComponent } from './../../../basic/components/date-picker/date-picker.component';
import { ReservationService } from './../../services/reservation.service';
import { cloneDeep, isEqual } from 'lodash';
import { Reservation } from 'src/app/modules/common/models/reservation.models';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Timestamp } from 'firebase/firestore';
@Component({
  selector: 'reservation-repetition',
  templateUrl: './reservation-repetition.component.html',
  styleUrls: ['./reservation-repetition.component.scss'],
})
export class ReservationRepetitionComponent {
  @ViewChild('cal') public calendar!: DatePickerComponent;
  public selectedDate?: Date;
  public addedReservations: Reservation[] = [];
  public selectedDates: Date[] = [];
  public viewDate!: Date;
  public constructor(
    public dialogRef: MatDialogRef<ReservationRepetitionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reservation,
    private _db: ReservationService
  ) {
    this.addedReservations = [data];
    this.selectedDates = [data.day.toDate()];
    this.viewDate = data.day.toDate();
  }

  public classGenerator = (date: Date): string => {
    if (
      this.addedReservations.some((r) =>
        isEqual(r.day, Timestamp.fromDate(date))
      )
    )
      return 'selected-date';
    return '';
  };

  public copy(): void {
    if (this.selectedDate == null) return;
    const date = this.selectedDate!;
    if (this.selectedDates.some((d) => isEqual(d, date))) {
      const res = this.addedReservations.find((r) =>
        isEqual(r.day, Timestamp.fromDate(date))
      )!;
      this._db.del(res).then(() => {
        this.addedReservations.splice(
          this.addedReservations.findIndex((r) => res == r),
          1
        );
        this.selectedDates.splice(
          this.selectedDates.findIndex((d) => isEqual(d, date)),
          1
        );
        this.selectedDates = [...this.selectedDates];
        this.selectedDate = undefined;
        this.calendar.refresh();
      });
      this.selectedDate = undefined;
      return;
    }
    const newReservation = cloneDeep(this.data);
    newReservation.id = undefined;
    newReservation.day = Timestamp.fromDate(date);
    this._db.put(newReservation)?.then(() => {
      this.addedReservations.push(newReservation);
      this.selectedDates.push(newReservation.day.toDate());
      this.selectedDates = [...this.selectedDates];
      this.selectedDate = undefined;
      this.calendar.refresh();
    });
    this.selectedDate = undefined;
  }
}
