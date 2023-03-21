export function placeBetweenLimits(value: number, min?: number, max?: number): number {
  if (max != null && min != null && max < min) throw Error('Min can not be higher than max');
  if (min != null && value < min) value = min;
  if (max != null && value > max) value = max;
  return value;
}

export function areLinearOverlapped(startA: number, endA: number, startB: number, endB: number): boolean {
  return ((startA < endB) && (startB < endA) && (startA < endA) && (startB < endB)) ||
    ((startA < endB) && (startA < endA) && (startB < endA) && (startB < endB)) ||
    (startA < Math.min(endA, endB) && (startB < Math.min(endA, endB))) ||
    (Math.max(startA, startB) < Math.min(endA, endB))
}
