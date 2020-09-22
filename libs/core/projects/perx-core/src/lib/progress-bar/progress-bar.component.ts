import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'perx-progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: [
    'progress-bar.component.scss'
  ]
})

export class ProgressBarComponent implements OnInit{
  @Input()
  public stampImgUrl: string = 'https://perx-cdn-staging.s3.amazonaws.com/razer-assets/razer-stamp.png';
  @Input()
  public noStampImgUrl: string = 'https://perx-cdn-staging.s3.amazonaws.com/razer-assets/unstamped.png';
  @Input()
  public stages: number = 3;
  @Input()
  public current: number = 0;
  @Input()
  public stageLabels: string|number[] = [];

  public ngOnInit() {
    const { stages, current, stageLabels } = this;
    console.log('stages, current, label', stages, current, stageLabels);
  }

  // helper function for rendering # slots using ngFor
  public arrayFromNumber(n: number): any[] {
    return Array(n);
  }
}
