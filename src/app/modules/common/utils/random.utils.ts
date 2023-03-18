export function generateName(names: string[], name: string): string {
  let i: number = 1;
  let newName: string = name;
  while (names.some(n => n == newName)) {
    newName = `${name} ${i}`; i++;
  }
  return newName;
}
