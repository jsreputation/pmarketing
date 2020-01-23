/* eslint-disable prefer-template */
import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';
import {ApiConfig} from '@cl-core/api-config';

@Component({
  selector: 'cl-dialog-preview-selector',
  templateUrl: './dialog-preview-selector.component.html',
  styleUrls: ['./dialog-preview-selector.component.scss']
})
export class DialogPreviewSelectorComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private readonly _matDialogRef: MatDialogRef<DialogPreviewSelectorComponent>;
  private readonly triggerElementRef: ElementRef;
  public apiCdnPath: string = ApiConfig.apiCdnPath;
  public imageGraphic: IGraphic;

  constructor(matDialogRef: MatDialogRef<DialogPreviewSelectorComponent>,
              @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef, img: IGraphic }) {
    this._matDialogRef = matDialogRef;
    this.triggerElementRef = data.trigger;
    // if have head. HEAD should be compulsory isntead
    this.imageGraphic = data.img;
    // this.extendedImageDisplay = data.img.body;
  }

  public ngOnInit(): void {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${rect.left + 22}px`, top: `${rect.bottom - 63}px` };
    matDialogConfig.width = '290px';
    matDialogConfig.height = '101px';
    this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this._matDialogRef.updatePosition(matDialogConfig.position);
  }

  public formImagePreviewHtml(): string {
    if (this.imageGraphic.type.includes('snake')) {
      // length of the preview is 4;
      if (this.imageGraphic.imageParts) {
        return `<div class="snake-preview-ext">` + `<img class="image" src=${this.apiCdnPath + this.imageGraphic.img} alt=${this.imageGraphic.title}>` +
          Array(3).fill('').map(_ =>  `<img class="image" src=${this.apiCdnPath + this.imageGraphic.imageParts.img} alt=${this.imageGraphic.imageParts.title}>`)
            .reduce((accumStr, currStr) => accumStr + currStr, '') + `</div>`;
      }
      return `<div class="snake-preview-ext">` +
        Array(4).fill('').map(_ =>  `<img class="image" src=${this.apiCdnPath + this.imageGraphic.img} alt=${this.imageGraphic.title}>`)
          .reduce((accumStr, currStr) => accumStr + currStr, '')  + `</div>`;
    }
  }

  public cancel(): void {
    this._matDialogRef.close(null);
  }

}
