import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: [
    'progress-bar.component.scss'
  ]
})

export class ProgressBarComponent implements OnInit {
  @Input()
  stampImgUrl: string = 'https://perx-cdn-staging.s3.amazonaws.com/razer-assets/razer-stamp.png';
  @Input()
  noStampImgUrl: string = 'https://perx-cdn-staging.s3.amazonaws.com/razer-assets/unstamped.png';
  @Input()
  stages: number = 5;
  @Input()
  updater$: Observable<number> = of(2);
  @Input()
  stageLabels: string|number[] = [1, 10, 30, 60, 120];

  constructor() {
  }

  ngOnInit() {
  }

  // helper function for rendering # slots using ngFor
  public arrayFromNumber(n: number): any[] {
    return Array(n);
  }
}
