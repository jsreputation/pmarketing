import { FormControl } from '@angular/forms';
import { ApiConfig } from '@cl-core/api-config';

export class ImageControlValue {

  public static getApiCdnPath(): string {
    return ApiConfig.apiCdnPath;
  }

  public static getImgLink(control: FormControl, defaultImg?: string): string {
    if (!(control && control.value)) {
      return defaultImg;
    }
    if (control.value.fullImg) {
      return ImageControlValue.prepareImage(control.value.fullImg);
    }
    if (control.value.img) {
      return ImageControlValue.prepareImage(control.value.img);
    }
    return ImageControlValue.prepareImage(control.value);
  }

  public static getImagePath(data: IGraphic): string {
    return data.fullImg
      ? ImageControlValue.prepareImage(data.fullImg)
      : data.img
        ? ImageControlValue.prepareImage(data.img)
        : (data as any);
  }

  public static getPrepareValue(val: any, graphicList: IGraphic[]): IGraphic | any {
    if (graphicList) {
      for (const item of graphicList) {
        if ( ImageControlValue.prepareImage(item.fullImg).includes(val)  || ImageControlValue.prepareImage(item.img).includes(val)) {
          return item;
        }
      }
      return val;
    }
    return val;
  }

  public static prepareImage(image: string): string {
    return (/^https:\/\//i).test(image) ? image : ImageControlValue.getApiCdnPath() + image;
  }
}
