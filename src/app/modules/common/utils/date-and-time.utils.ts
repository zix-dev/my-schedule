import { Time } from '@angular/common';

export function timeToString(time?: Time): string | undefined {
  if (time == null) return undefined;
  return `${time.hours}:${time.minutes}`
}

export function stringToTime(string?: string, format24h: boolean = true): Time | undefined {
  if (string == null || string?.trim() == '') return undefined;
  const valid = (new RegExp('\\d\\d:\\d\\d')).test(string);

  if (!valid) return undefined;
  const numbers = string.split(':').map(s => parseInt(s));
  if ((numbers.some(n => n < 0)) || (numbers[1] > 59) || (numbers[0] > (format24h ? 23 : 11))) return undefined;
  return { hours: numbers[0], minutes: numbers[1] }
}
