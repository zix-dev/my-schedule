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
    const sort = (a: { name: string }, b: { name: string }) => (a.name > b.name ? 1 : -1);
    this._db.get<Employee>('personal').subscribe(result => this.personal = result.sort(sort));
    this._db.get<Room>('rooms').subscribe(result => this.rooms = result.sort(sort));
    this._db.get<Machine>('machines').subscribe(result => this.machines = result.sort(sort));
  }
  public ngOnDestroy(): void {
    this._subs.forEach(sub => sub.unsubscribe());
  }
}
