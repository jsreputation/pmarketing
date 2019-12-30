export function sum(value: any[], fieldName: string): number {
  return value.reduce((total, item) => {
    if (item[fieldName]) {
      total += parseInt(item[fieldName], 10);
    }
    return total;
  }, 0);
}
