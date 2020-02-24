import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AvailableNewEngagementService,
  RoutingStateService,
  StampsService, TenantStoreService
} from '@cl-core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { combineLatest, Observable, of, Subject } from 'rxjs';
import { tap, map, switchMap, takeUntil } from 'rxjs/operators';

import { StampDataService } from '../../shared/stamp-data.service';
import { ControlsName } from '../../../../models/controls-name';
import { PuzzleCollectStamp, PuzzleCollectStampState } from '@perx/core';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { SimpleMobileViewComponent } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.component';
import { IWEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';
import { IUploadedFile } from '@cl-core/models/upload-file/uploaded-file.interface';
import { CommonSelect } from '@cl-core/models/common-select.interface';
import { IStampsDefaultValue } from '@cl-core/models/games/stamps/stamps-default-value.interface';
import { ITenantsProperties } from '@cl-core/models/settings/tenants.properties.interface';
import { IStampsEntityForm } from '@cl-core/models/games/stamps/stamps-entity-form.interface';

@Component({
  selector: 'cl-new-stamp',
  templateUrl: './new-stamp.component.html',
  styleUrls: ['./new-stamp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewStampComponent implements OnInit, OnDestroy {
  @ViewChild(SimpleMobileViewComponent, { static: false }) public simpleMobileViewComponent: SimpleMobileViewComponent;

  private destroy$: Subject<void> = new Subject();

  public id: string;
  public formStamp: FormGroup;
  public stampSlotNumbers: CommonSelect[];
  public allStampSlotNumbers: CommonSelect[];
  public stampData: IStampsDefaultValue;
  public stamps: PuzzleCollectStamp[] = [];
  public stampsSlotNumberData: { rewardPosition: number }[] = [];
  public tenantSettings: ITenantsProperties;

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

  constructor(
    private fb: FormBuilder,
    private routingState: RoutingStateService,
    private router: Router,
    private route: ActivatedRoute,
    private stampDataService: StampDataService,
    private availableNewEngagementService: AvailableNewEngagementService,
    private stampsService: StampsService,
    private cd: ChangeDetectorRef,
    private tenantStoreService: TenantStoreService
  ) {
  }

  public ngOnInit(): void {
    this.initTenantsSettings();
    this.createStampForm();
    combineLatest([this.getStampData(), this.handleRouteParams()])
      .subscribe(
        ([previewData, stamp]) => {
          this.stampData = previewData;
          this.stampSlotNumbers = this.allStampSlotNumbers = previewData.slotNumber;
          const patchData = stamp || this.getDefaultValue(previewData);
          this.formStamp.patchValue(patchData);
          this.cd.detectChanges();
        },
        (error: Error) => {
          console.warn(error.message);
          this.router.navigateByUrl('/engagements');
        }
      );
    this.subscribeStampsNumberChanges();
    this.subscribeStampsSlotChanges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  public save(): void {
    if (this.formStamp.invalid) {
      this.formStamp.markAllAsTouched();
      return;
    }
    this.simpleMobileViewComponent.createPreview()
      .pipe(
        switchMap((imageUrl: IUploadedFile) => {
          if (this.id) {
            return this.stampsService.updateStamp(this.id, { ...this.formStamp.value, image_url: imageUrl.url });
          }
          return this.stampsService.createStamp({ ...this.formStamp.value, image_url: imageUrl.url }).pipe(
            tap(
              (engagement: IJsonApiItemPayload<IWEngagementAttributes>) =>
                this.availableNewEngagementService.transformAndSetNewEngagement(engagement)
            )
          );
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigateByUrl('/engagements'));
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
      buttonText: ['See My Rewards', [
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
          this.stamps = [];
          for (let i = 1; i <= value; i++) {
            this.stamps.push({
              id: 1,
              state: PuzzleCollectStampState.redeemed
            });
          }
          this.stampSlotNumbers = this.stampDataService.filterStampSlot(this.allStampSlotNumbers, value);
          this.formStamp.get('stampsSlotNumber').patchValue([]);
          // selected last slot
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
      .subscribe((value: number[]) => {
        if (!value) {
          return;
        }
        this.stampsSlotNumberData = value.map(
          (item: number) => ({ rewardPosition: item - 1 })
        );
      });
  }

  private getStampData(): Observable<IStampsDefaultValue> {
    return this.stampsService.getStampsData();
  }

  private getDefaultValue(data: IStampsDefaultValue): Partial<IStampsEntityForm> {
    return {
      stampsNumber: data.number[data.number.length - 1].value,
      stampsSlotNumber: [data.slotNumber[data.slotNumber.length - 1].value],
      preStamp: data.preStamp[0],
      postStamps: data.stampsPost[0],
      rewardPostStamps: data.rewardPost[0],
      rewardPreStamps: data.rewardPreStamp[0],
      cardBackground: data.cardBackground[0],
      background: data.backgroundStamp[0]
    };
  }

  private initTenantsSettings(): void {
    this.tenantStoreService.tenant$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ITenantsProperties) => {
        this.tenantSettings = res;
        this.cd.detectChanges();
      });
  }

  private handleRouteParams(): Observable<Partial<IStampsEntityForm> | null> {
    return this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      tap(id => this.id = id),
      switchMap(id => {
        if (id) {
          return this.stampsService.getStamp(id);
        }
        return of(null);
      }),
      takeUntil(this.destroy$)
    );
  }
}
