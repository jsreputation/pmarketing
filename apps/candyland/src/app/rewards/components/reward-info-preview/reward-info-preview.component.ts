import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cl-reward-info-preview',
  templateUrl: './reward-info-preview.component.html',
  styleUrls: ['./reward-info-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewardInfoPreviewComponent implements OnInit, OnDestroy {
  @Input() public data: any;

  public imageControl: FormControl = new FormControl();

  public ngOnInit(): void {
    this.initRewardImage();
  }

  public ngOnDestroy(): void {
  }

  private initRewardImage(): void {
    if (this.data && this.data.image) {
      this.imageControl.patchValue(this.data.image);
    }
  }
}
