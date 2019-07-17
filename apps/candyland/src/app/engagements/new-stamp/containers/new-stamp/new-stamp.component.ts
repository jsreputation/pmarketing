import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StampHttpService } from '@cl-core/http-services/stamp-http.service';
import { Observable } from 'rxjs';
import { RoutingStateService } from '@cl-core/services/routing-state.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cl-new-stamp',
  templateUrl: './new-stamp.component.html',
  styleUrls: ['./new-stamp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewStampComponent implements OnInit {
  public formStamp: FormGroup;
  public stampNumbers$: Observable<CommonSelect[]>;
  public stampSlotNumbers$: Observable<CommonSelect[]>;
  public preStamps$: Observable<IGraphic[]>;
  public rewardPreStamps$: Observable<IGraphic[]>;
  public postStamps$: Observable<IGraphic[]>;
  public rewardPostStamps$: Observable<IGraphic[]>;
  public cardBackground$: Observable<IGraphic[]>;
  public backgrounds$: Observable<IGraphic[]>;
  constructor(private fb: FormBuilder,
              private stampService: StampHttpService,
              private routingState: RoutingStateService,
              private router: Router) { }

  ngOnInit() {
    this.createStampForm();
    this.getNumberStamps();
    this.getSlotStamps();
    this.getPreStamps();
    this.getRewardPreStamps();
    this.getPostStamps();
    this.getRewardPostStamps();
    this.getCardBackground();
    this.getBackground();
  }
  public get name(): AbstractControl {
    return this.formStamp.get('name');
  }

  public get headlineMessage(): AbstractControl {
    return this.formStamp.get('headlineMessage');
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.formStamp.get('subHeadlineMessage');
  }

  public get buttonText(): AbstractControl {
    return this.formStamp.get('buttonText');
  }

  public save(): void {
    this.router.navigateByUrl('/engagements');
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  private createStampForm(): void {
    this.formStamp = this.fb.group({
      name: ['Stamps 1', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]
      ],
      headlineMessage: ['Collect stamps', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      subHeadlineMessage: ['Earn rewards!', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      stampsNumber: [null, [Validators.required]],
      stampsSlotNumber: [null, [Validators.required]],
      preStamp: [null, [Validators.required]],
      rewardPreStamps: [null, [Validators.required]],
      postStamps: [null, [Validators.required]],
      rewardPostStamps: [null, [Validators.required]],
      cardBackground: [null, [Validators.required]],
      background: [null, [Validators.required]],
      buttonText: ['see my rewards', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getNumberStamps(): void {
    this.stampNumbers$ = this.stampService.getStampsNumber()
      .pipe(
        tap((res) => {
          this.patchForm('stampsNumber', res[res.length - 1].value);
        })
      );
  }

  private getSlotStamps(): void {
    this.stampSlotNumbers$ = this.stampService.getStampsSlotNumber()
      .pipe(
        tap((res) => {
          this.patchForm('stampsSlotNumber', [res[res.length - 1].value]);
        })
      );
  }

  private getPreStamps(): void {
    this.preStamps$ = this.stampService.getPreStamps()
      .pipe(
        tap((res) => {
          this.patchForm('preStamp', res[0]);
        })
      );
  }

  private getRewardPreStamps(): void {
    this.rewardPreStamps$ = this.stampService.getRewardPreStamps()
      .pipe(
        tap((res) => {
          this.patchForm('rewardPreStamps', res[0]);
        })
      );
  }

  private getPostStamps(): void {
    this.postStamps$ = this.stampService.getPostStamps()
      .pipe(
        tap((res) => {
          this.patchForm('postStamps', res[0]);
        })
      );
  }

  private getRewardPostStamps(): void {
    this.rewardPostStamps$ = this.stampService.getRewardPostStamps()
      .pipe(
        tap((res) => {
          this.patchForm('rewardPostStamps', res[0]);
        })
      );
  }

  private getCardBackground(): void {
    this.cardBackground$ = this.stampService.getCardBackground()
      .pipe(
        tap((res) => {
          this.patchForm('cardBackground', res[0]);
        })
      );
  }

  private getBackground(): void {
    this.backgrounds$ = this.stampService.getBackground()
      .pipe(
        tap((res) => {
          this.patchForm('background', res[0]);
        })
      );
  }

  private patchForm(fieldName: string, value: any): void {
    this.formStamp.patchValue({
      [fieldName]: value
    });
  }
}
