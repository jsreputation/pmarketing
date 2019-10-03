import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
  styleUrls: ['./sound.component.scss']
})
export class SoundComponent {
  public enabled: boolean = false;

  public onEnable: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<SoundComponent>
  ) { }

  public onEnableSound(enable: boolean): void {
    this.enabled = enable;
    this.onEnable.emit(enable);
  }
}
