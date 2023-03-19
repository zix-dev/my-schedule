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
  ) {
    this.editing = data.title.trim() != '';
    this.selectedEmployees = this.config.personal.filter(e => data.personalIds?.includes(e.id!))
    this.selectedRooms = this.config.rooms.filter(r => data.roomsIds?.includes(r.id!))
    this.selectedMachines = this.config.machines.filter(m => data.machinesIds?.includes(m.id!))
  }

  public unselectEmployee(employee: Employee): void {
    this.selectedEmployees.splice(this.selectedEmployees.findIndex(e => e.id == employee.id), 1);
    this.selectedEmployees = [...this.selectedEmployees]
    this.updateSelection();
  }

  public unselectRoom(room: Room): void {
    this.selectedRooms.splice(this.selectedRooms.findIndex(e => e.id == room.id), 1);
    this.selectedRooms = [...this.selectedRooms];
    this.updateSelection();
  }

  public unselectMachine(machine: Machine): void {
    this.selectedMachines.splice(this.selectedMachines.findIndex(e => e.id == machine.id), 1);
    this.selectedMachines = [...this.selectedMachines];
    this.updateSelection();
  }

  public updateSelection(): void {
    this.data.personalIds = this.selectedEmployees.map(e => e.id!);
    this.data.roomsIds = this.selectedRooms.map(r => r.id!);
    this.data.machinesIds = this.selectedMachines.map(m => m.id!);
  }
}
