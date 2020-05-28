import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';

interface ITag {
  name: string;
  isSelected: boolean;
}

interface ILabels {
  filter: string;
  clearAll: string;
  categories: string;
  apply: string;
}

interface IData {
  tags: ITag[];
  labels: ILabels
}

@Component({
  selector: 'perx-core-location-filter-popup',
  templateUrl: './location-filter-popup.component.html',
  styleUrls: ['./location-filter-popup.component.scss']
})
export class LocationFilterPopupComponent implements OnInit {
  public tags: ITag[];
  public labels: ILabels;

  constructor(
    private dialogRef: MatDialogRef<LocationFilterPopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IData) { }

  public ngOnInit(): void {
    this.tags = this.data.tags;
    this.labels = this.data.labels;
  }

  public onRadioSelect(event: MatCheckboxChange, index: number): void {
    this.tags[index].isSelected = event.checked;
  }

  public onApplyFilter(): void {
    this.dialogRef.close(this.tags);
  }

  public onClearFilter(): void {
    this.tags = this.tags.map(tag => ({ ...tag, isSelected: false }));
  }
}
