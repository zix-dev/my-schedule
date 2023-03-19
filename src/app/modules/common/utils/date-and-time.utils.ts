import { Time } from '@angular/common';

export function timeToString(time?: Time): string | undefined {
  if (time == null) return undefined;
  const hourStr = `${time.hours > 9 ? '' : '0'}${time.hours}`
  const minuteStr = `${time.minutes > 9 ? '' : '0'}${time.minutes}`
  return `${hourStr}:${minuteStr}`
}

export function stringToTime(string?: string, format24h: boolean = true): Time | undefined {
  if (string == null || string?.trim() == '') return undefined;
  const valid = (new RegExp('\\d\\d:\\d\\d')).test(string);

  if (!valid) return undefined;
  const numbers = string.split(':').map(s => parseInt(s));
  if ((numbers.some(n => n < 0)) || (numbers[1] > 59) || (numbers[0] > (format24h ? 23 : 11))) return undefined;
  return { hours: numbers[0], minutes: numbers[1] }
}

export function timeToDate(time: Time, date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(time.hours);
  newDate.setMinutes(time.minutes);
  return newDate;
}

export function dateToTime(date: Date): Time {
  return { hours: date.getHours(), minutes: date.getMinutes() }
}

export function isLater(t1: Time, t2: Time): boolean {
  if (t1.hours == t2.hours) return t1.minutes > t2.minutes;
  return t1.hours > t2.hours
}
