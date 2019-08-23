import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ControlValueService {

  public getImgLink(control: FormControl, defaultImg?: string): string {
    if (!(control && control.value)) {
      return defaultImg;
    }
    if (control.value.fullImg) {
      return control.value.fullImg;
    }
    if (control.value.img) {
      return control.value.img;
    }
    return control.value;
  }

  public getImagePath(data: IGraphic): string {
    return data.fullImg ? data.fullImg : data.img;
  }
}
