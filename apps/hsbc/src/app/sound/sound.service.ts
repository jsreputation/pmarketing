import { Injectable, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SoundComponent } from './sound.component';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  icon = 'volume_off';

  onToggle = new EventEmitter<boolean>();

  private audio: HTMLAudioElement;

  constructor(
    private dialog: MatDialog
  ) {
    this.audio = new Audio('assets/background.mov');
    if (typeof this.audio.loop === 'boolean') {
      this.audio.loop = true;
    } else {
      this.audio.addEventListener('ended', () => {
          this.audio.currentTime = 0;
          this.audio.play();
        }, false);
    }
  }

  play() {
    if (this.audio) { this.audio.play(); }
    this.icon = 'volume_up';
    this.onToggle.emit(true);
    localStorage.setItem('enableSound', 'true');
  }



  pause(persist = true) {
    if (this.audio) { this.audio.pause(); }
    this.icon = 'volume_off';
    this.onToggle.emit(false);
    if (persist) {
      localStorage.setItem('enableSound', 'false');
    }
  }

  isPlaying() {
    return this.audio && !this.audio.paused;
  }

  toggle() {
    this.isPlaying() ? this.pause() : this.play();
  }

  showPopup() {
    const dialogRef = this.dialog.open(SoundComponent, { disableClose: true });
    const subscription = dialogRef.componentInstance.onEnable.subscribe((enable: boolean) => {
      enable ? this.play() : this.pause();
    });

    dialogRef.afterClosed().subscribe(() => {
      subscription.unsubscribe();
    });
  }
}
