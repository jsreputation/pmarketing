export class TimeZoneSort {

  public static compareTimeZone(a: ITimeZone, b: ITimeZone): number {
    const aN = TimeZoneSort.zone2Number(a.zone);
    const bN = TimeZoneSort.zone2Number(b.zone);
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
}
