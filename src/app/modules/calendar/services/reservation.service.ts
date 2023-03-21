import { BehaviorSubject, Observable } from 'rxjs';
import { PopupService } from './../../basic/services/popup.service';
import { Reservation } from './../../common/models/reservation.models';
import { DatabaseService } from './../../../database.service';
import { Injectable } from '@angular/core';
import { DocumentReference } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  public reservations: Reservation[] = [];

  private readonly _reservationsUpdated = new BehaviorSubject<Reservation[]>([]);

  public readonly reservationsChanged = this._reservationsUpdated.asObservable();

  public constructor(private _db: DatabaseService, private _popup: PopupService) {
    this._db.get<Reservation>('reservations').subscribe(result => {
      this.reservations = result;
      this._reservationsUpdated.next(result);
    })
  }

  public get(id: string): Reservation {
    return this.reservations.find(r => r.id == id)!;
  }

  public put(reservation: Reservation): Promise<DocumentReference<Reservation>> {
    return this._db.put<Reservation>(reservation, 'reservations')
  }

  public update(reservation: Reservation): Promise<void> {
    return this._db.update<Reservation>(reservation, 'reservations')
  }

  public del(reservation: Reservation): Promise<void> {
    return this._db.del<Reservation>(reservation, 'reservations')
  }

}
