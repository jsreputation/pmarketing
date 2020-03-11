import { Component, ViewChild } from '@angular/core';
import { IGameComponent } from '@perxtech/core';

@Component({
  selector: 'app-shake',
  templateUrl: './shake.component.html',
  styleUrls: ['./shake.component.scss']
})
export class ShakeComponent {
  @ViewChild('shake', { static: false })
  private shake: IGameComponent;

  public reset(): void {
    this.shake.reset();
  }
}
