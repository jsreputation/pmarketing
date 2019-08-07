import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StampDataService {

  public filterStampSlot(slotNumber: CommonSelect[], count: string ) {
    return slotNumber.filter((slot) => {
      return +slot.value <= +count;
    });
  }
}
