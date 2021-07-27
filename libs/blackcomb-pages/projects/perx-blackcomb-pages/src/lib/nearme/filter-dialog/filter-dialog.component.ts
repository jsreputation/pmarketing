import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategories, IData } from '../nearme.component';
import { IPopupConfig } from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {
  public categories: ICategories[];
  public showButton: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IData,
    @Inject(MAT_DIALOG_DATA) public dataPopup: IPopupConfig
  ) {
    if (dataPopup.disableOverlayClose) {
      dialogRef.disableClose = dataPopup.disableOverlayClose;
    }

    if (dataPopup.hideButton) {
      this.showButton = false;
    }
  }

  public ngOnInit(): void {
    this.categories = this.data.categories;
  }

  public onRadioSelect(event: MatCheckboxChange, index: number): void {
    this.categories[index].isSelected = event.checked;
  }

  public onApplyFilter(): void {
    this.dialogRef.close(this.categories);
  }

  public onClearFilter(): void {
    this.categories = this.categories.map(tag => ({...tag, isSelected: false}));
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}

