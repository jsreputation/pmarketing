import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'cl-dialog-preview-selector',
  templateUrl: './dialog-preview-selector.component.html',
  styleUrls: ['./dialog-preview-selector.component.scss']
})
export class DialogPreviewSelectorComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private readonly _matDialogRef: MatDialogRef<DialogPreviewSelectorComponent>;
  private readonly triggerElementRef: ElementRef;
  public colorOfSnake: string = '#7A409E';
  constructor(matDialogRef: MatDialogRef<DialogPreviewSelectorComponent>,
              @Inject(MAT_DIALOG_DATA) data: { trigger: ElementRef }) {
    this._matDialogRef = matDialogRef;
    this.triggerElementRef = data.trigger;
  }

  public ngOnInit(): void {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${rect.left + 115}px`, top: `${rect.bottom - 115}px` };
    matDialogConfig.width = '290px';
    matDialogConfig.height = '101px';
    this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this._matDialogRef.updatePosition(matDialogConfig.position);
  }

  public cancel(): void {
    this._matDialogRef.close(null);
  }

}
