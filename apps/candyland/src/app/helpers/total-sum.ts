export function sum(value: any[], fieldName: string) {
  return value.reduce((total, item) => {
    if (item[fieldName]) {
      total += parseInt(item[fieldName], 10);
    }
    return total;
  }, 0);
}
