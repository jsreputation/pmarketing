import { FormControl } from '@angular/forms';

export class ImageControlValue {

  public static getImgLink(control: FormControl, defaultImg?: string): string {
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

  public static getImagePath(data: IGraphic): string {
    return data.fullImg ? data.fullImg : data.img;
  }
}
