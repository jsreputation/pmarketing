import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AvailableNewEngagementService, RoutingStateService, SettingsService } from '@cl-core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { combineLatest, Observable, of, Subject } from 'rxjs';
import { tap, map, switchMap, takeUntil } from 'rxjs/operators';

import { ControlsName } from '../../../../models/controls-name';
import { ISlice } from '@perx/core';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SimpleMobileViewComponent } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.component';
import {IWEngagementAttributes } from '@perx/whistler';

@Component({
  selector: 'cl-new-spin-page',
  templateUrl: './new-spin-page.component.html',
  styleUrls: ['./new-spin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSpinPageComponent implements OnInit, OnDestroy {
  @ViewChild(SimpleMobileViewComponent, {static: false}) public simpleMobileViewComponent: SimpleMobileViewComponent;

  private destroy$: Subject<void> = new Subject();

  public id: string;
  public formSpin: FormGroup;
  public stampSlotNumbers: CommonSelect[];
  public allStampSlotNumbers: CommonSelect[];
  public stampData: IStampsDefaultValue;
  public iSlices: ISlice[] = [];
  public stampsSlotNumberData: { rewardPosition: number }[] = [];
  public tenantSettings: ITenantsProperties;

  public get name(): AbstractControl {
    return this.formSpin.get(ControlsName.name);
  }

  public get headlineMessage(): AbstractControl {
    return this.formSpin.get(ControlsName.headlineMessage);
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.formSpin.get(ControlsName.subHeadlineMessage);
  }

  public get buttonText(): AbstractControl {
    return this.formSpin.get(ControlsName.buttonText);
  }

  public get background(): AbstractControl {
    return this.formSpin.get(ControlsName.background);
  }

  public get colorCtrls(): FormArray {
    return (this.formSpin.get(ControlsName.colorCtrls) as FormArray);
  }

  public get numberOfWedges(): AbstractControl {
    return this.formSpin.get(ControlsName.numberOfWedges);
  }

  public get rewardSlots(): AbstractControl {
    return this.formSpin.get(ControlsName.rewardSlots);
  }

  public get rewardIcon(): AbstractControl {
    return this.formSpin.get(ControlsName.rewardIcon);
  }

  public get wheelImg(): AbstractControl {
    return this.formSpin.get(ControlsName.wheelImg);
  }

  public get wheelPosition(): AbstractControl {
    return this.formSpin.get(ControlsName.wheelPosition);
  }

  public get pointerImg(): AbstractControl {
    return this.formSpin.get(ControlsName.pointerImg);
  }

  constructor(
    private fb: FormBuilder,
    private routingState: RoutingStateService,
    private router: Router,
    private route: ActivatedRoute,
    // private stampDataService: StampDataService,
    private availableNewEngagementService: AvailableNewEngagementService,
    // private stampsService: StampsService,
    private cd: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {
  }

  public ngOnInit(): void {
    this.initTenants();
    this.createStampForm();
    combineLatest([this.getStampData(), this.handleRouteParams()])
      .subscribe(
        ([previewData, stamp]) => {
          this.stampData = previewData;
          this.stampSlotNumbers = this.allStampSlotNumbers = previewData.slotNumber;
          const patchData = stamp || this.getDefaultValue(previewData);
          this.formSpin.patchValue(patchData);
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
    if (this.formSpin.invalid) {
      this.formSpin.markAllAsTouched();
      return;
    }
    this.simpleMobileViewComponent.createPreview()
      .pipe(
        switchMap((imageUrl: IUploadedFile) => {
          if (this.id) {
            return this.stampsService.updateStamp(this.id, {...this.formSpin.value, image_url: imageUrl.url});
          }
          return this.stampsService.createStamp({...this.formSpin.value, image_url: imageUrl.url}).pipe(
            tap(
              (engagement: IJsonApiPayload<IWEngagementAttributes>) =>
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
    this.formSpin = this.fb.group({
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
      background: [null, [Validators.required]],
      buttonText: ['See My Rewards', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      numberOfWedges: [null, [Validators.required]], // stampsNumber
      rewardSlots: [null, [Validators.required]], // stampsSlotNumber
      colorCtrls: new FormArray([]),
      // color selection,
      rewardIcon: [null, [Validators.required]],
      wheelImg: [null, [Validators.required]],
      wheelPosition: [null, [Validators.required]],
      pointerImg: [null, [Validators.required]]
    });
  }

  private patchForm(fieldName: string, value: any): void {
    this.formSpin.patchValue({
      [fieldName]: value
    });
  }

  /*** START subscription to form value Changes ***/
  private subscribeSpinsNumberChanges(): void {
    this.formSpin.get('numberOfWedges')
      .valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        value => {
          for (let i = 0; i <= value; i++) {
            this.colorCtrls.push(
              this.fb.control({labelView: 'Primary Color', color: '#fff'}, [Validators.required])
            ); // temp push all same colours
            this.iSlices.push({
              id: '1',
              labelColor: this.colorCtrls.at(i).value.color
            });
          }
          this.formSpin.get('rewardSlots').patchValue([]);
          this.patchForm('rewardSlots', [this.rewardSlots[this.rewardSlots.length - 1].value]);
        });
  }

  private subscribeStampsSlotChanges(): void {
    this.formSpin.get(ControlsName.stampsSlotNumber)
      .valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((value: number[]) => {
        if (!value) {
          return;
        }
        this.stampsSlotNumberData = value.map(
          (item: number) => ({rewardPosition: item - 1})
        );
      });
  }
  /*** END subscription to form value Changes ***/

  private getSpinData(): Observable<IStampsDefaultValue> {
    return this.stampsService.getStampsData();
  }

  /*** START ***/
  private initTenants(): void {
    this.settingsService.getTenants()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Tenants) => {
        this.tenantSettings = SettingsHttpAdapter.getTenantsSettings(res);
        this.cd.detectChanges();
      });
  }

  private handleRouteParams(): Observable<Partial<IStampsEntityForm> | null> {
    return this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      tap(id => this.id = id),
      switchMap(id => {
        if (id) {
          return this.spinService.getSpin(id);
        }
        return of(null);
      }),
      takeUntil(this.destroy$)
    );
  }
  /*** END ***/
}
