import { Employee, Room, Machine } from './../../models/configurations.models';
import { ConfigService } from './../../services/config.service';
import { Component } from '@angular/core';

@Component({
  selector: 'personal-rooms-and-machines',
  templateUrl: './personal-rooms-and-machines.component.html',
  styleUrls: ['./personal-rooms-and-machines.component.scss']
})
export class PersonalRoomsAndMachinesComponent {

  public sidebarOpened: boolean = false;

  public selectedEmployee?: Employee;

  public selectedRoom?: Room;

  public selectedMachine?: Machine;

  public constructor(public config: ConfigService) { }

  public selectEmployee(e: Employee): void {
    this.selectedEmployee = e;
    this.selectedRoom = undefined;
    this.selectedMachine = undefined;
    this.sidebarOpened = true;
  }

  public selectRoom(r: Room): void {
    this.selectedEmployee = undefined;
    this.selectedRoom = r;
    this.selectedMachine = undefined;
    this.sidebarOpened = true;
  }

  public selectMachine(m: Machine): void {
    this.selectedEmployee = undefined;
    this.selectedRoom = undefined;
    this.selectedMachine = m;
    this.sidebarOpened = true;
  }

}
