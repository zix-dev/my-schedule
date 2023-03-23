import { Time } from '@angular/common';

export function timeToString(time?: Time): string | undefined {
  if (time == null) return undefined;
  const hourStr = `${time.hours > 9 ? '' : '0'}${time.hours}`;
  const minuteStr = `${time.minutes > 9 ? '' : '0'}${time.minutes}`;
  return `${hourStr}:${minuteStr}`;
}

export function stringToTime(
  string?: string,
  format24h: boolean = true
): Time | undefined {
  if (string == null || string?.trim() == '') return undefined;
  const valid = new RegExp('\\d\\d:\\d\\d').test(string);

  if (!valid) return undefined;
  const numbers = string.split(':').map((s) => parseInt(s));
  if (
    numbers.some((n) => n < 0) ||
    numbers[1] > 59 ||
    numbers[0] > (format24h ? 23 : 11)
  )
    return undefined;
  return { hours: numbers[0], minutes: numbers[1] };
}

export function timeToDate(time: Time, date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(time.hours);
  newDate.setMinutes(time.minutes);
  return newDate;
}

export function dateToTime(date: Date): Time {
  return { hours: date.getHours(), minutes: date.getMinutes() };
}

export function isLater(t1: Time, t2: Time): boolean {
  if (t1.hours == t2.hours) return t1.minutes > t2.minutes;
  return t1.hours > t2.hours;
}

export function valueOf(time: Time): number {
  return time.hours * 60 + time.minutes;
}

export function removeTime(date: Date): void {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
}

export function getDayMonthHeader(date: Date): string {
  return WEEK_NAMES[date.getDay()].substring(0, 3);
}

export function getDayWeekHeader(date: Date): string {
  const name = WEEK_NAMES[date.getDay()].substring(0, 3);
  return `${name} ${date.getDate()}`;
}

export function getDayHeader(date: Date): string {
  const weekName = WEEK_NAMES[date.getDay()];
  const monthName = MONTH_NAMES[date.getMonth()];
  return `${weekName} ${date.getDate()} de ${monthName}`;
}

export const WEEK_NAMES = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];
export const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
