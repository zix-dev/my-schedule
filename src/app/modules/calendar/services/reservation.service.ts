import { BehaviorSubject } from 'rxjs';
import { PopupService } from './../../basic/services/popup.service';
import { Reservation } from './../../common/models/reservation.models';
import { DatabaseService } from './../../../database.service';
import { Injectable } from '@angular/core';
import { DocumentReference } from 'firebase/firestore';
import { areLinearOverlapped } from '../../common/utils/number.utils';
import { valueOf } from '../../common/utils/date-and-time.utils';

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

  public put(reservation: Reservation): Promise<DocumentReference<Reservation>> | null {
    if (this._checkReservationOverlaps(reservation)) return null;
    return this._db.put<Reservation>(reservation, 'reservations')
  }

  public update(reservation: Reservation): Promise<void> | null {
    if (this._checkReservationOverlaps(reservation)) return null;
    return this._db.update<Reservation>(reservation, 'reservations')
  }

  public del(reservation: Reservation): Promise<void> {
    return this._db.del<Reservation>(reservation, 'reservations')
  }

  private _checkReservationOverlaps(res: Reservation): boolean {
    const overlaps = this._getReservationOverlaps(res);
    if (overlaps.length > 0) this._popup.openDialog({ title: 'Error', text: 'Se ha encontrado solapamiento con esta reserva', buttons: [{ text: 'Vale' }] });
    return overlaps.length > 0;
  }

  private _getReservationOverlaps(res: Reservation): ReservationOverlap[] {
    const overlaps: ReservationOverlap[] = []
    const resStart = valueOf(res.start);
    const resEnd = valueOf(res.end);
    this.reservations.forEach(r => {
      if (r.day.toDate().getDate() != res.day.toDate().getDate()) return;
      if (r.id == res.id) return;
      if (areLinearOverlapped(resStart, resEnd, valueOf(r.start), valueOf(r.end))) {
        const overlap: ReservationOverlap = { reservationId: r.id!, personalIds: [], roomIds: [], machinesIds: [] };
        overlap.personalIds = res.personalIds?.filter(id => r.personalIds?.includes(id)) ?? [];
        overlap.roomIds = res.roomsIds?.filter(id => r.roomsIds?.includes(id)) ?? [];
        overlap.machinesIds = res.machinesIds?.filter(id => r.machinesIds?.includes(id)) ?? [];
        if (overlap.personalIds.length > 0 || overlap.roomIds.length > 0 || overlap.machinesIds.length > 0)
          overlaps.push(overlap);
      }
    })
    return overlaps;
  }

}

export type ReservationOverlap = { reservationId: string; personalIds: string[]; roomIds: string[]; machinesIds: string[] }
