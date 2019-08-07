import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'daysOnGoing'})
export class DaysOnGoingPipe implements PipeTransform {
  public transform(date: Date): string {
    //   const given = moment(date, 'YYYY-MM-DD');
    //   const current = moment().startOf('day');
    //   return moment.duration(current.diff(given)).asDays();
    return date.toISOString();
  }
}
