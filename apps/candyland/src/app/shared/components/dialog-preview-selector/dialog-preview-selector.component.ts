/* eslint-disable prefer-template */
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';
import { IGraphic } from '@cl-core/models/graphic.interface';

@Component({
  selector: 'cl-dialog-preview-selector',
  templateUrl: './dialog-preview-selector.component.html',
  styleUrls: ['./dialog-preview-selector.component.scss']
})
export class DialogPreviewSelectorComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private readonly _matDialogRef: MatDialogRef<DialogPreviewSelectorComponent>;
  private readonly triggerElementRef: ElementRef;
  public imageGraphic: IGraphic;
  public upload: boolean;

  constructor(matDialogRef: MatDialogRef<DialogPreviewSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef, img: IGraphic, upload: boolean }) {
    this._matDialogRef = matDialogRef;
    this.triggerElementRef = data.trigger;
    // if have head. HEAD should be compulsory instead
    this.imageGraphic = data.img;
    this.upload = data.upload;
  }

  public ngOnInit(): void {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    if (this.triggerElementRef) {
      const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
      matDialogConfig.position = { left: `${rect.left + 20}px`, top: `${rect.bottom - 63}px` };
      matDialogConfig.width = '290px';
      matDialogConfig.height = '101px';
      this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
      this._matDialogRef.updatePosition(matDialogConfig.position);
    }
  }
}
