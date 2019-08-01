import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'fullname'})
export class FullnamePipe implements PipeTransform {
  transform(user): string {
    if (!user) {
      return '';
    }
    return `${user.firstName} ${user.lastName}`;
  }
}
