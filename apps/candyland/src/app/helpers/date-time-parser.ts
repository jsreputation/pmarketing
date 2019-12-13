import * as moment from 'moment';

export class DateTimeParser {

  public static compareTimeZone(a: ITimeZone, b: ITimeZone): number {
    const aN = DateTimeParser.zone2Number(a.zone);
    const bN = DateTimeParser.zone2Number(b.zone);
    return aN - bN;
  }

  public static zone2Number(z: string): number {
    const sign: string = z.substring(3, 4);
    const time: string = z.substring(4);
    const times: string[] = time.split(':');
    if (times.length !== 2) {
      throw new Error(`Invalid time zone ${z}`);
    }
    const hours = Number.parseInt(times[0], 10);
    const minutes = Number.parseInt(times[1], 10);
    return (hours + minutes / 60) * (sign === '+' ? 1 : -1);
  }

  public static setTime(date: string, time: any): any {
    const [hours, minutes] = time.split(':');
    return moment(date).set({hours, minutes}).utc().toDate();
  }

  public static getTime(date?: string, format?: string): any {
    return moment(date).format(format);
  }

  public static stringToDate(stringDate: string | null): Date | null {
    return stringDate ? new Date(stringDate) : null;
  }

  public static stringToTime(date?: string, format?: string): string {
    return date ? DateTimeParser.getTime(date, format) : '';
  }
}
