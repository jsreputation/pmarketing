import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ControlValueService {

  constructor() { }

  public getImgLink(control: FormControl, defaultImg: string): string {
    if (!(control && control.value)) {
      return defaultImg;
    }
    return control.value.img
      ? control.value.img
      : control.value;
  }
}
