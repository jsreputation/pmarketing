import { Component, Input } from '@angular/core';

@Component({
  selector: 'perx-progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: [
    'progress-bar.component.scss'
  ]
})

export class ProgressBarComponent {
  @Input()
  public stampImgUrl: string = 'https://perx-cdn-staging.s3.amazonaws.com/razer-assets/razer-stamp.png';
  @Input()
  public noStampImgUrl: string = 'https://perx-cdn-staging.s3.amazonaws.com/razer-assets/unstamped.png';
  @Input()
  public stages: number = 5;
  @Input()
  public current: number = 2;
  @Input()
  public stageLabels: string|number[] = [1, 10, 30, 60, 120];

  // helper function for rendering # slots using ngFor
  public arrayFromNumber(n: number): any[] {
    return Array(n);
  }
}
