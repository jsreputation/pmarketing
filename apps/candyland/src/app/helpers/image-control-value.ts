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
    return data.fullImg
      ? data.fullImg
      : data.img
        ? data.img
        : (data as any);
  }

  public static getPrepareValue(val: any, graphicList: IGraphic[]): IGraphic | any {
    if (graphicList) {
      for (const item of graphicList) {
        if (item.fullImg === val || item.img === val) {
          return item;
        }
      }
      return val;
    }
    return val;
  }
}
