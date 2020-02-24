import { Injectable } from '@angular/core';
import { CommonSelect } from '@cl-core/models/common-select.interface';

@Injectable({
  providedIn: 'root'
})
export class StampDataService {

  public filterStampSlot(slotNumber: CommonSelect[], count: string): CommonSelect[] {
    return slotNumber.filter((slot) => +slot.value <= +count);
  }
}
