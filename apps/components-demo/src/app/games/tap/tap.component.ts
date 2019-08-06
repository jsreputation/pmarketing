import { Component, ViewChild } from '@angular/core';
import { IGameComponent } from '@perx/core';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent {
  @ViewChild('tap', {static: false})
  private shake: IGameComponent;

  public reset(): void {
    this.shake.reset();
  }
}
