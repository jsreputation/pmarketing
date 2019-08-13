import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StampHttpService } from '@cl-core/http-services/stamp-http.service';
import { Observable, Subject } from 'rxjs';
import { RoutingStateService } from '@cl-core/services/routing-state.service';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { StampDataService } from '../../shared/stamp-data.service';
import { ControlsName } from '../../../../models/controls-name';
import { ControlValueService } from '@cl-core/services/control-value.service';
import { PuzzleCollectStamp, PuzzleCollectStampState } from '@perx/core';

@Component({
  selector: 'cl-new-stamp',
  templateUrl: './new-stamp.component.html',
  styleUrls: ['./new-stamp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewStampComponent implements OnInit, OnDestroy {
  public formStamp: FormGroup;
  public stampSlotNumbers: CommonSelect[];
  public allStampSlotNumbers: CommonSelect[];
  public stampData$: Observable<{
    number: CommonSelect[],
    slotNumber: CommonSelect[],
    cardBackground: IGraphic[],
    rewardPost: IGraphic[],
    stampsPost: IGraphic[],
    rewardPreStamp: IGraphic[],
    preStamp: IGraphic[],
    backgroundStamp: IGraphic[],
  }>;
  public stamps: PuzzleCollectStamp[] = [];
  public stampsSlotNumberData = [];
  private destroy$ = new Subject();
  constructor(private fb: FormBuilder,
              private stampService: StampHttpService,
              private routingState: RoutingStateService,
              private router: Router,
              private stampDataService: StampDataService,
              private controlValueService: ControlValueService) { }

  public ngOnInit(): void {
    this.createStampForm();
    this.subscribeStampsNumberChanges();
    this.subscribeStampsSlotChanges();
    this.getStampData();
  }
  public get name(): AbstractControl {
    return this.formStamp.get(ControlsName.name);
  }

  public get headlineMessage(): AbstractControl {
    return this.formStamp.get(ControlsName.headlineMessage);
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.formStamp.get(ControlsName.subHeadlineMessage);
  }

  public get buttonText(): AbstractControl {
    return this.formStamp.get(ControlsName.buttonText);
  }

  public get background(): AbstractControl {
    return this.formStamp.get(ControlsName.background);
  }

  public get cardBackground(): AbstractControl {
    return this.formStamp.get(ControlsName.cardBackground);
  }

  public get stampsNumber(): AbstractControl {
    return this.formStamp.get(ControlsName.stampsNumber);
  }

  public get preStamp(): AbstractControl {
    return this.formStamp.get(ControlsName.preStamp);
  }

  public get postStamps(): AbstractControl {
    return this.formStamp.get(ControlsName.postStamps);
  }

  public get rewardPreStamps(): AbstractControl {
    return this.formStamp.get(ControlsName.rewardPreStamps);
  }

  public get rewardPostStamps(): AbstractControl {
    return this.formStamp.get(ControlsName.rewardPostStamps);
  }

  public get stampsSlotNumber(): any[] {
    return (this.formStamp.get(ControlsName.stampsSlotNumber) as FormArray).value.map((item: string) => ({ id: +item }));
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return this.controlValueService.getImgLink(control, defaultImg);
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

  private patchForm(fieldName: string, value: any): void {
    this.formStamp.patchValue({
      [fieldName]: value
    });
  }

  private subscribeStampsNumberChanges(): void {
    this.formStamp.get('stampsNumber')
      .valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => {
          for (let i = 0; i <= value; i++) {
            this.stamps.push({
              id: 1,
              state: PuzzleCollectStampState.redeemed,
            });
          }
          this.stampSlotNumbers = this.stampDataService.filterStampSlot(this.allStampSlotNumbers, value);
          this.patchForm('stampsSlotNumber', [this.stampSlotNumbers[this.stampSlotNumbers.length - 1].value]);
        }
      );
  }

  private subscribeStampsSlotChanges(): void {
    this.formStamp.get(ControlsName.stampsSlotNumber)
      .valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((value: string[]) => {
        this.stampsSlotNumberData = value.map((item: string) => {
          return { rewardPosition: +item - 1};
        });
      });
  }

  private getStampData(): void {
    this.stampData$ = this.stampService.getStampsData()
      .pipe(
        tap((res) => {
          this.stampSlotNumbers = this.allStampSlotNumbers = res.slotNumber;
          this.formStamp.patchValue({
            stampsNumber: res.number[res.number.length - 1].value,
            stampsSlotNumber: [res.slotNumber[res.slotNumber.length - 1].value],
            preStamp: res.preStamp[0],
            postStamps: res.stampsPost[0],
            rewardPostStamps: res.rewardPost[0],
            rewardPreStamps: res.rewardPreStamp[0],
            cardBackground: res.cardBackground[0],
            background: res.backgroundStamp[0]
          });
        })
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
