import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fieldsInArray'})
export class FieldsInArrayPipe implements PipeTransform {
  public transform(data: { [key: string]: any }[], key: string): string {
    return data.map(item => (key in item) ? item[key] : null)
      .filter(item => !!item)
      .join(' ,');
  }
}
