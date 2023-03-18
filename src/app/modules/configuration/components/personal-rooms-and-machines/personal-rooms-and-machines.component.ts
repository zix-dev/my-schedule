import { DatabaseService } from './../../../../database.service';
import { Employee, Room, Machine } from './../../models/configurations.models';
import { ConfigService } from './../../services/config.service';
import { Component } from '@angular/core';
import { generateName } from 'src/app/modules/common/utils/random.utils';
import { isEqual } from 'lodash';

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

  public pristine: boolean = true;

  public constructor(public config: ConfigService, private _db: DatabaseService) { }

  public selectEmployee(e: Employee): void {
    this.unselect();
    this.selectedEmployee = { ...e };
    this.sidebarOpened = true;
  }

  public selectRoom(r: Room): void {
    this.unselect();
    this.selectedRoom = { ...r };
    this.sidebarOpened = true;
  }

  public selectMachine(m: Machine): void {
    this.unselect();
    this.selectedMachine = { ...m };
    this.sidebarOpened = true;
  }

  public addEmployee(): void {
    const name: string = generateName(this.config.personal.map(p => p.name), 'Persona');
    const newEmployee = { name: name, color: '#ffffff' };
    this._db.put<Employee>(newEmployee, 'personal').then(() => {
      this.selectEmployee(newEmployee)
    })
  }

  public addRoom(): void {
    const name: string = generateName(this.config.rooms.map(p => p.name), 'Habitación');
    const newRoom = { name: name };
    this._db.put<Room>(newRoom, 'rooms').then(() => {
      this.selectRoom(newRoom)
    })
  }

  public addMachine(): void {
    const name: string = generateName(this.config.machines.map(p => p.name), 'Máquina');
    const newMachine = { name: name };
    this._db.put<Machine>(newMachine, 'machines').then(() => {
      this.selectMachine(newMachine)
    })
  }

  public save(): void {
    if (this.selectedEmployee != null) {
      this._db.update<Employee>(this.selectedEmployee, 'personal').then(() => this.checkDirty());
    } else if (this.selectedRoom != null) {
      this._db.update<Room>(this.selectedRoom, 'rooms').then(() => this.checkDirty());
    } else if (this.selectedMachine != null) {
      this._db.update<Machine>(this.selectedMachine, 'machines').then(() => this.checkDirty());
    }
  }

  public checkDirty(): void {
    if (this.selectedEmployee != null) {
      this.pristine = this.config.personal.some(e => isEqual(e, this.selectedEmployee))
    } else if (this.selectedRoom != null) {
      this.pristine = this.config.rooms.some(r => isEqual(r, this.selectedRoom))
    } else if (this.selectedMachine != null) {
      this.pristine = this.config.machines.some(m => isEqual(m, this.selectedMachine))
    }
  }

  public remove(): void {
    let prom: Promise<unknown> | undefined = undefined;
    if (this.selectedEmployee != null) {
      prom = this._db.del(this.selectedEmployee, 'personal');
    } else if (this.selectedRoom != null) {
      prom = this._db.del(this.selectedRoom, 'rooms');
    } else if (this.selectedMachine != null) {
      prom = this._db.del(this.selectedMachine, 'machines');
    }
    prom?.then(() => {
      this.unselect();
      this.sidebarOpened = false;
    })
  }

  public unselect(): void {
    this.selectedEmployee = undefined;
    this.selectedRoom = undefined;
    this.selectedMachine = undefined;
  }


}
