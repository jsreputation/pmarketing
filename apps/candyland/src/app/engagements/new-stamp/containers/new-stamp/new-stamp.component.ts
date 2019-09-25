import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AvailableNewEngagementService, RoutingStateService, SettingsService, StampsService } from '@cl-core/services';
import { Router } from '@angular/router';
import { takeUntil, tap, map } from 'rxjs/operators';
import { StampDataService } from '../../shared/stamp-data.service';
import { ControlsName } from '../../../../models/controls-name';
import { PuzzleCollectStamp, PuzzleCollectStampState } from '@perx/core';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';

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
  public tenantSettings: ITenantsProperties;
  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private routingState: RoutingStateService,
    private router: Router,
    private stampDataService: StampDataService,
    private availableNewEngagementService: AvailableNewEngagementService,
    private stampsService: StampsService,
    private cdr: ChangeDetectorRef,
    private settingsService: SettingsService
  ) { }

  public ngOnInit(): void {
    this.getTenants();
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
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  public save(): void {
    this.stampsService.createStamp(this.formStamp.value)
      .pipe(
        untilDestroyed(this),
        map((engagement: IResponseApi<IEngagementApi>) => EngagementHttpAdapter.transformEngagement(engagement.data))
      )
      .subscribe((data: IEngagement) => {
        this.availableNewEngagementService.setNewEngagement(data);
        this.router.navigateByUrl('/engagements');
      });
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  private createStampForm(): void {
    this.formStamp = this.fb.group({
      name: ['Stamp Card Template', [Validators.required,
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
              state: PuzzleCollectStampState.redeemed
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
          return { rewardPosition: +item - 1 };
        });
      });
  }

  private getStampData(): void {
    this.stampData$ = this.stampsService.getStampsData()
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

  private getTenants(): void {
    this.settingsService.getTenants()
      .subscribe((res: Tenants) => {
        this.tenantSettings = SettingsHttpAdapter.getTenantsSettings(res);
        this.cdr.detectChanges();
      });
  }
}
