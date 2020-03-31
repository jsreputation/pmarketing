import { Pipe, PipeTransform } from '@angular/core';
import { ApiConfig } from '@cl-core/api-config';
import { IGraphic } from '@cl-core/models/graphic.interface';

@Pipe({ name: 'snakePreview' })
export class SnakePreviewPipe implements PipeTransform {
  public transform(snakeGraphic: IGraphic, upload?: boolean): string {
    if (snakeGraphic.imageParts) {
      return `${'<div class="snake-preview-ext">' + `<img class="image" src=${upload ? snakeGraphic.img : ApiConfig.apiCdnPath + snakeGraphic.img} alt=${snakeGraphic.title}>`}${
        Array(3).fill('').map(_ => `<img class="image" src=${upload ? snakeGraphic.imageParts[0].img : ApiConfig.apiCdnPath + snakeGraphic.imageParts[0].img} alt=${snakeGraphic.imageParts[0].title}>`)
          .reduce((accumStr, currStr) => accumStr + currStr, '')}</div>`;
    }
    return `<div class="snake-preview-ext">${
      Array(4).fill('').map(_ => `<img class="image" src=${upload ? snakeGraphic.img : ApiConfig.apiCdnPath + snakeGraphic.img} alt=${snakeGraphic.title}>`)
        .reduce((accumStr, currStr) => accumStr + currStr, '')}</div>`;
  }
}
