export function isEmptyString(value: string | null | undefined): boolean {
  return value === '' || (value === null || value === undefined);
}

export function isEmptyArray(array: any[]): boolean {
  return array === undefined || array === null || array.length === 0;
}
