import { Employee, Room, Machine } from './../../../configuration/models/configurations.models';
import { ConfigService } from './../../../configuration/services/config.service';
import { Reservation } from '../../../common/models/reservation.models';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'appointment-edition',
  templateUrl: './appointment-edition.component.html',
  styleUrls: ['./appointment-edition.component.scss']
})
export class AppointmentEditionComponent {
  public editing: boolean = false;
  public selectedEmployees: Employee[] = [];
  public selectedRooms: Room[] = [];
  public selectedMachines: Machine[] = [];
  public constructor(
    public config: ConfigService,
    public dialogRef: MatDialogRef<AppointmentEditionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reservation,
  ) { this.editing = data.title.trim() != '' }

  public unselectEmployee(employee: Employee): void {
    this.selectedEmployees.splice(this.selectedEmployees.findIndex(e => e.id == employee.id), 1);
    this.selectedEmployees = [...this.selectedEmployees]
  }

  public unselectRoom(room: Room): void {
    this.selectedRooms.splice(this.selectedRooms.findIndex(e => e.id == room.id), 1);
    this.selectedRooms = [...this.selectedRooms]
  }

  public unselectMachine(machine: Machine): void {
    this.selectedMachines.splice(this.selectedMachines.findIndex(e => e.id == machine.id), 1);
    this.selectedMachines = [...this.selectedMachines]
  }
}
