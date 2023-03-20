import { valueOf } from 'src/app/modules/common/utils/date-and-time.utils';
import { Reservation } from "../../common/models/reservation.models";

export function reservationOverlaps(res: Reservation, list: Reservation[]): ReservationOverlap[] {
  const overlaps: ReservationOverlap[] = []
  list.forEach(r => {
    if (r.day.toDate().getDate() != res.day.toDate().getDate()) return;
    if (r.id == res.id) return;
    if (areReservationOverlapping(res, r)) {
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

export function areReservationOverlapping(a: Reservation, b: Reservation): boolean {
  const startA = valueOf(a.start);
  const startB = valueOf(b.start);
  const endA = valueOf(a.end);
  const endB = valueOf(b.end);
  return ((startA < endB) && (startB < endA) && (startA < endA) && (startB < endB)) ||
    ((startA < endB) && (startA < endA) && (startB < endA) && (startB < endB)) ||
    (startA < Math.min(endA, endB) && (startB < Math.min(endA, endB))) ||
    (Math.max(startA, startB) < Math.min(endA, endB))
}

export type ReservationOverlap = { reservationId: string; personalIds: string[]; roomIds: string[]; machinesIds: string[] }
