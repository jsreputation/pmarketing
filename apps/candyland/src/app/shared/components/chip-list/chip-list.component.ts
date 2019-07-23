import { Component, Input, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cl-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})
export class ChipListComponent implements OnInit {
  @Input() public visible = true;
  @Input() public selectable = true;
  @Input() public removable = true;
  @Input() public addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input() labels = [
    {name: 'Label A'},
    {name: 'Label B'},
    {name: 'Label C'},
  ];
  control = new FormControl();

  constructor() { }

  ngOnInit() {
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.labels.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  public remove(label): void {
    const index = this.labels.indexOf(label);

    if (index >= 0) {
      this.labels.splice(index, 1);
    }
  }

}
