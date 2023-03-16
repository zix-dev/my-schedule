import { Reservation } from '../../../common/models/reservation.models';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'appointment-edition',
  templateUrl: './appointment-edition.component.html',
  styleUrls: ['./appointment-edition.component.scss']
})
export class AppointmentEditionComponent {

  public editing: boolean = false;
  public constructor(
    public dialogRef: MatDialogRef<AppointmentEditionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reservation,
  ) { this.editing = data.title.trim() != '' }
}
