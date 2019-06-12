import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'perx-core-shake-tree',
  templateUrl: './shake-tree.component.html',
  styleUrls: ['./shake-tree.component.css']
})
export class ShakeTreeComponent implements OnInit {
  @Input()
  requiredTaps = 5;

  @Input()
  enabled = false;

  @Output()
  completed: EventEmitter<void> = new EventEmitter<void>();

  n = 0;
  constructor() { }

  ngOnInit() {
  }

  tapped() {
    console.log(this.enabled);
    if (this.enabled) {
      this.n++;
      if (this.n === this.requiredTaps) {
        this.completed.emit();
      }
    }
  }
}
