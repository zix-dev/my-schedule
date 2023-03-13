export function placeBetweenLimits(value: number, min?: number, max?: number): number {
  if (max != null && min != null && max < min) throw Error('Min can not be higher than max');
  if (min != null && value < min) value = min;
  if (max != null && value > max) value = max;
  return value;
}
