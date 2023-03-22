import { Reservation } from './../../../common/models/reservation.models';
import { ConfigService } from './../../../configuration/services/config.service';
import { ReservationOverlap } from './../../services/reservation.service';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Time } from '@angular/common';
import { valueOf } from 'src/app/modules/common/utils/date-and-time.utils';

@Component({
  selector: 'reservation-overlaps',
  templateUrl: './reservation-overlaps.component.html',
  styleUrls: ['./reservation-overlaps.component.scss'],
})
export class ReservationOverlapsComponent {
  public overlaps: { icon: string; name: string; start: Time; end: Time }[] =
    [];

  public constructor(
    public dialogRef: MatDialogRef<ReservationOverlapsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { overlaps: ReservationOverlap[]; reservation: Reservation },
    config: ConfigService
  ) {
    data.overlaps.forEach((overlap) => {
      const push = (icon: string, name: string) =>
        this.overlaps.push({
          icon: icon,
          name: name,
          start: overlap.reservation.start,
          end: overlap.reservation.end,
        });
      overlap.personalIds.forEach((id) =>
        push('fa-solid fa-user', config.personal.find((p) => p.id == id)!.name)
      );
      overlap.roomIds.forEach((id) =>
        push(
          'fa-solid fa-house-medical',
          config.rooms.find((r) => r.id == id)!.name
        )
      );
      overlap.machinesIds.forEach((id) =>
        push(
          'fa-solid fa-computer',
          config.machines.find((m) => m.id == id)!.name
        )
      );
    });
    this.overlaps.sort((a, b) => {
      return valueOf(a.start) - valueOf(b.start);
    });
  }
}
