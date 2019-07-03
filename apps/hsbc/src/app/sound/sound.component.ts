import { Component, OnInit, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent implements OnInit {
  enabled = false;

  onEnable = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<SoundComponent>
  ) { }

  ngOnInit() {
  }

  onEnableSound(enable: boolean) {
    this.enabled = enable;
    this.onEnable.emit(enable);
  }
}
