import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import { ApiConfig } from '@cl-core/api-config';
import {MatDialog} from '@angular/material';
import {DialogPreviewSelectorComponent} from '@cl-shared/components/dialog-preview-selector/dialog-preview-selector.component';

@Component({
  selector: 'cl-images-preview',
  templateUrl: './images-preview.component.html',
  styleUrls: ['./images-preview.component.scss']
})
export class ImagesPreviewComponent {
  @Input() public upload: boolean = false;
  @Input() public img: IGraphic;
  @Input() public selected: any;
  @Input() public diagBox: boolean;
  @Output() public selectPreview: EventEmitter<IGraphic> = new EventEmitter<IGraphic>();
  @Output() public edit: EventEmitter<boolean> = new EventEmitter<boolean>();

  public constructor(public matDialog: MatDialog, public cd: ChangeDetectorRef) {
  }

  public apiCdnPath: string = ApiConfig.apiCdnPath;
  public previewOpen: boolean = false;

  public handlerClick(): void {
    this.selectPreview.emit(this.img);
  }

  public handlerClear(): void {
    this.edit.emit(true);
  }

  // Call the dialog
  public onShowDialog(evt: MouseEvent): void {
    this.previewOpen = true;
    const target = new ElementRef(evt.currentTarget);
    const dialogRef = this.matDialog.open(DialogPreviewSelectorComponent, {
      data: { trigger: target, img: this.img, upload: this.upload },
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe( _ => {
      this.previewOpen = false;
      this.cd.detectChanges();
    });
  }

}
