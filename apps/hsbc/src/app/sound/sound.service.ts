import { Injectable, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SoundComponent } from './sound.component';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  public icon: string = 'volume_off';

  public onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  private audio: HTMLAudioElement;

  constructor(
    private dialog: MatDialog
  ) {
    this.audio = new Audio('assets/christmas_jingle_bells.mp3');
    if (typeof this.audio.loop === 'boolean') {
      this.audio.loop = true;
    } else {
      this.audio.addEventListener('ended', () => {
        this.audio.currentTime = 0;
        this.audio.play();
      }, false);
    }
  }

  public play(): void {
    if (this.audio) { this.audio.play(); }
    this.icon = 'volume_up';
    this.onToggle.emit(true);
    localStorage.setItem('enableSound', 'true');
  }

  public pause(persist: boolean = true): void {
    if (this.audio) { this.audio.pause(); }
    this.icon = 'volume_off';
    this.onToggle.emit(false);
    if (persist) {
      localStorage.setItem('enableSound', 'false');
    }
  }

  public isPlaying(): boolean {
    return this.audio && !this.audio.paused;
  }

  public toggle(): void {
    this.isPlaying() ? this.pause() : this.play();
  }

  public showPopup(): void {
    const dialogRef = this.dialog.open(SoundComponent, { disableClose: true });
    const subscription = dialogRef.componentInstance.onEnable.subscribe((enable: boolean) => {
      enable ? this.play() : this.pause();
    });

    dialogRef.afterClosed().subscribe(() => {
      subscription.unsubscribe();
    });
  }
}
