import { ReservationService } from './../../services/reservation.service';
import { PopupService } from './../../../basic/services/popup.service';
import {
  Employee,
  Room,
  Machine,
} from './../../../configuration/models/configurations.models';
import { ConfigService } from './../../../configuration/services/config.service';
import { Reservation } from '../../../common/models/reservation.models';
import { Component, Inject } from '@angular/core';
import { cloneDeep } from 'lodash';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'appointment-edition',
  templateUrl: './appointment-edition.component.html',
  styleUrls: ['./appointment-edition.component.scss'],
})
export class AppointmentEditionComponent {
  public selectedEmployees: Employee[] = [];
  public selectedRooms: Room[] = [];
  public selectedMachines: Machine[] = [];
  public reservation!: Reservation;
  public pristine: boolean = false;
  public constructor(
    public config: ConfigService,
    public dialogRef: MatDialogRef<AppointmentEditionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { reservation: Reservation; creation: boolean },
    private _popup: PopupService,
    private _db: ReservationService
  ) {
    this.reservation = cloneDeep(data.reservation);
    this.selectedEmployees = this.config.personal.filter((e) =>
      this.reservation.personalIds?.includes(e.id!)
    );
    this.selectedRooms = this.config.rooms.filter((r) =>
      this.reservation.roomsIds?.includes(r.id!)
    );
    this.selectedMachines = this.config.machines.filter((m) =>
      this.reservation.machinesIds?.includes(m.id!)
    );
  }

  public unselectEmployee(employee: Employee): void {
    this.selectedEmployees.splice(
      this.selectedEmployees.findIndex((e) => e.id == employee.id),
      1
    );
    this.selectedEmployees = [...this.selectedEmployees];
    this.updateSelection();
  }

  public unselectRoom(room: Room): void {
    this.selectedRooms.splice(
      this.selectedRooms.findIndex((e) => e.id == room.id),
      1
    );
    this.selectedRooms = [...this.selectedRooms];
    this.updateSelection();
  }

  public unselectMachine(machine: Machine): void {
    this.selectedMachines.splice(
      this.selectedMachines.findIndex((e) => e.id == machine.id),
      1
    );
    this.selectedMachines = [...this.selectedMachines];
    this.updateSelection();
  }

  public updateSelection(): void {
    this.reservation.personalIds = this.selectedEmployees.map((e) => e.id!);
    this.reservation.roomsIds = this.selectedRooms.map((r) => r.id!);
    this.reservation.machinesIds = this.selectedMachines.map((m) => m.id!);
    this.reservation.color =
      this.selectedEmployees.length > 0
        ? this.selectedEmployees[0].color
        : '#cccccc';
  }

  public save(): void {
    if (this.reservation.title.trim() == '')
      this.reservation.title = 'sin título';
    if (this.data.creation)
      this._db.put(this.reservation)?.then(() => this.dialogRef.close());
    else this._db.update(this.reservation)?.then(() => this.dialogRef.close());
  }

  public remove(): void {
    this._popup
      .openDialog({
        title: 'Eliminar Reserva',
        text: 'Estás seguro de que quieres eliminar esta reserva?',
        buttons: [
          { text: 'Cancelar' },
          { text: 'Eliminar', icon: 'fa-solid fa-trash', type: 'warn' },
        ],
      })
      .afterClosed()
      .subscribe((result) => {
        if (result == 1) this._db.del(this.data.reservation);
        this.dialogRef.close();
      });
  }
}
