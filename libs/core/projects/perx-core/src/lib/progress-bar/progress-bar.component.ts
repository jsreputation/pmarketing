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
  public stampImgUrl: string = 'https://perx-cdn-staging.s3.amazonaws.com/razer-assets/razer-stamp.png';
  @Input()
  public noStampImgUrl: string = 'https://perx-cdn-staging.s3.amazonaws.com/razer-assets/unstamped.png';
  @Input()
  public stages: number = 5;
  @Input()
  public updater$: Observable<number> = of(2);
  @Input()
  public stageLabels: string|number[] = [1, 10, 30, 60, 120];

  // helper function for rendering # slots using ngFor
  public arrayFromNumber(n: number): any[] {
    return Array(n);
  }
}
