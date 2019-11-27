import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clConditionInfo'
})
export class ConditionInfoPipe implements PipeTransform {

  public transform(conditions: any[]): string {
    const result: string =  conditions.map(this.getConditionText)
      .filter(value => value !== null)
      .join('\nAND\n');
    console.log('ConditionInfoPipe', conditions, result);
    return result;
  }

  public getConditionText(condition: any): string | null {
    console.log('Conditione', condition);
    switch (condition.type) {
      case 'transaction':
        return `Makes a ${condition.value} transaction`;
      case 'amount':
        return `Makes a transaction amount ${condition.operator} ${condition.value} cu`;
      case 'currency':
        return `Makes a transaction in ${condition.value} currency`;
      case 'date':
        return `Makes a transaction ${condition.operator} ${condition.value} date`;
      default:
        return null;
    }
  }

  // public getOperatorText(condition: any): string {
  //   switch (condition.field) {
  //     case 'transaction':
  //       return '';
  //     case 'amount':
  //       return '';
  //     case 'currency':
  //       return '';
  //     case 'date':
  //       return '';
  //   }
  // }

}
