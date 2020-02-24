import { AbstractControl } from '@angular/forms';
import { ApiConfig } from '@cl-core/api-config';
import { IGraphic } from '@cl-core/models/graphic.interface';

export class ImageControlValue {

  public static getApiCdnPath(): string {
    return ApiConfig.apiCdnPath;
  }

  public static getImgLink(control: AbstractControl, defaultImg?: string): string {
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

  public static getImgLinkLayer(control: AbstractControl, layeredIndex: number, defaultImg?: string): string {
    if (!(control && control.value)) {
      return defaultImg; // return compulsory img : repeat the compulsory img | default one (35)
    }
    if (control.value.imageParts) {
      if (control.value.imageParts[layeredIndex] && control.value.imageParts[layeredIndex].fullImg) {
        return ImageControlValue.prepareImage(control.value.imageParts[layeredIndex].fullImg);
      }
      if (control.value.imageParts[layeredIndex] && control.value.imageParts[layeredIndex].img) {
        return ImageControlValue.prepareImage(control.value.imageParts[layeredIndex].img);
      }
    }
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  public static getImagePath(data: IGraphic | string): string {
    if (typeof data === 'string') {
      return data;
    }
    return data.fullImg
      ? ImageControlValue.prepareImage(data.fullImg)
      : ImageControlValue.prepareImage(data.img);
  }

  public static getPrepareValue(val: any, graphicList: IGraphic[]): IGraphic | any {
    if (graphicList) {
      for (const item of graphicList) {
        if (ImageControlValue.prepareImage(item.fullImg).includes(val) || ImageControlValue.prepareImage(item.img).includes(val)) {
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
