import { Component, ViewChild } from '@angular/core';
import { IGameComponent } from '@perxtech/core';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent {
  @ViewChild('tap')
  private shake: IGameComponent;

  public reset(): void {
    this.shake.reset();
  }
}
