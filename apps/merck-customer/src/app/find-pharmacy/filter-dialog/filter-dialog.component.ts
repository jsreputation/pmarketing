import { Component, OnInit, Inject } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IData, ITag } from '../find-pharmacy.component';

@Component({
  selector: 'mc-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {
  public tags: ITag[];

  constructor(
    private dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IData) { }

  public ngOnInit(): void {
    this.tags = this.data.tags;
  }

  public onRadioSelect(event: MatCheckboxChange, index: number): void {
    this.tags[index].isSelected = event.checked;
  }

  public onApplyFilter(): void {
    this.dialogRef.close(this.tags);
  }

  public onClearFilter(): void {
    this.tags = this.tags.map(tag => ({...tag, isSelected: false}));
  }
}
