import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'reservation-overlaps',
  templateUrl: './reservation-overlaps.component.html',
  styleUrls: ['./reservation-overlaps.component.scss'],
})
export class ReservationOverlapsComponent {
  public constructor(
    public dialogRef: MatDialogRef<ReservationOverlapsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
