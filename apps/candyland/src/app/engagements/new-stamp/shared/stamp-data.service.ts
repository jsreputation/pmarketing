import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StampDataService {

  public filterStampSlot(slotNumber: CommonSelect[], count: string ): CommonSelect[] {
    return slotNumber.filter((slot) => +slot.value <= +count);
  }
}
