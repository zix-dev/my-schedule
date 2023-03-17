import { Employee, Room, Machine } from './../models/configurations.models';
import { DatabaseService } from './../../../database.service';
import { Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements OnDestroy {
  public personal!: Employee[];
  public rooms!: Room[];
  public machines!: Machine[];
  private _subs: Subscription[] = [];
  constructor(private _db: DatabaseService) {
    this._db.get<Employee>('personal').subscribe(result => this.personal = result);
    this._db.get<Room>('rooms').subscribe(result => this.rooms = result);
    this._db.get<Machine>('machines').subscribe(result => this.machines = result);
  }
  public ngOnDestroy(): void {
    this._subs.forEach(sub => sub.unsubscribe());
  }
}
