import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'cl-reward-info-preview',
  templateUrl: './reward-info-preview.component.html',
  styleUrls: ['./reward-info-preview.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RewardInfoPreviewComponent implements OnInit, OnDestroy {
  @Input() public data: any;
  @Output() public updateRewardImage: EventEmitter<WindowBase64> = new EventEmitter<WindowBase64>();

  public imageControl = new FormControl();

  public ngOnInit(): void {
    this.initRewardImage();
    this.handleRewardImageChanges();
  }

  public ngOnDestroy(): void {
  }

  private initRewardImage(): void {
    if (this.data && this.data.image) {
      this.imageControl.patchValue(this.data.image);
    }
  }

  private handleRewardImageChanges(): void {
    this.imageControl.valueChanges.pipe(
      untilDestroyed(this),
      distinctUntilChanged(),
      filter(Boolean)
    ).subscribe((image: WindowBase64) => this.updateRewardImage.emit(image));
  }
}
