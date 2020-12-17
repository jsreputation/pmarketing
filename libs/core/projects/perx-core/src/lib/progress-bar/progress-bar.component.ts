import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'perx-progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: [
    'progress-bar.component.scss'
  ]
})

export class ProgressBarComponent implements OnInit {
  @Input()
  public stampImgUrl: string = 'https://perx-cdn-staging.s3.amazonaws.com/razer-assets/stamp.png';
  @Input()
  public noStampImgUrl: string = 'https://perx-cdn-staging.s3.amazonaws.com/razer-assets/unstamp.png';
  @Input()
  public stages: number = 3;
  @Input()
  public current: number = 0;
  @Input()
  public stageLabels: number[] = []; // length must be the same as stages
  @Input()
  public showProgressLabels: boolean = false;
  @Input()
  public accurateProg: boolean = false;

  public activeStampImgUrl: string = 'https://perx-cdn-staging.s3.amazonaws.com/razer-assets/activstamp.png';

  public currentRewardIndex: number = 0;
  // helper function for rendering # slots using ngFor
  public arrayFromNumber(n: number): any[] {
    return Array(n);
  }

  public ngOnInit(): void {
    if (this.stageLabels) {
      if (this.current >= this.stageLabels[this.stageLabels.length - 1]) {
        this.currentRewardIndex = this.stageLabels.length - 1;
        return;
      }
      const oneTierAboveReward = this.stageLabels
        .findIndex((labelNum) => this.current < labelNum);
      this.currentRewardIndex = oneTierAboveReward === -1 ? 0 : oneTierAboveReward - 1;
    }
  }
}
