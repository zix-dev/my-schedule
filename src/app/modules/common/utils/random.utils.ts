export function generateName(names: string[], name: string): string {
  let i: number = 1;
  let newName: string = name;
  while (names.some((n) => n == newName)) {
    newName = `${name} ${i}`;
    i++;
  }
  return newName;
}

export function getContrastColor(color: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  if (result == null) throw Error('Unexpected format');
  const value =
    (parseInt(result[1], 16) +
      parseInt(result[2], 16) +
      parseInt(result[3], 16)) /
    3;
  if (value > 210) return '#000000';
  return '#ffffff';
}
