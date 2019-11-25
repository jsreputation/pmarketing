export function isEmptyString(value: string | null | undefined): boolean {
  return value === '' || (value === null || value === undefined);
}
