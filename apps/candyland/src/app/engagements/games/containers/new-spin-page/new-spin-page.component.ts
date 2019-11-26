import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AvailableNewEngagementService, RoutingStateService, SettingsService } from '@cl-core/services';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { combineLatest, Observable, of, Subject } from 'rxjs';
import {tap, map, switchMap, takeUntil } from 'rxjs/operators';

import { ControlsName } from '../../../../models/controls-name';
import { ISlice } from '@perx/core';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SimpleMobileViewComponent } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.component';
import {IWEngagementAttributes } from '@perx/whistler';
import {SpinService} from '@cl-core/services/spin.service';

//  test
function rainbowGenerator(length: number): string[] {
  const size    = length; // change later on
  const rainbow = new Array(size);

  for (let i = 0; i < size; i++) {
    const red   = sin_to_hex(i, 0 / 3); // 0   deg
    const blue  = sin_to_hex(i, Math.PI * 2 / 3); // 120 deg
    const green = sin_to_hex(i, 2 * Math.PI * 2 / 3); // 240 deg

    rainbow[i] = '#' + red + green + blue;
  }

  function sin_to_hex(i: number, phase: number): string {
    const sin = Math.sin(Math.PI / size * 2 * i + phase);
    const int = Math.floor(sin * 127) + 128;
    const hex = int.toString(16);

    return hex.length === 1 ? '0' + hex : hex;
  }
  return rainbow;
}

@Component({
  selector: 'cl-new-spin-page',
  templateUrl: './new-spin-page.component.html',
  styleUrls: ['./new-spin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSpinPageComponent implements OnInit, OnDestroy {
  @ViewChild(SimpleMobileViewComponent, {static: false}) public simpleMobileViewComponent: SimpleMobileViewComponent;

  private destroy$: Subject<void> = new Subject();
  public MAX_WEDGES: number = 10;
  public id: string;
  public formSpin: FormGroup;
  public rewardSlotNumbers: CommonSelect[];
  public allRewardSlotNumbers: CommonSelect[];
  public spinData: ISpinDefaultValue;
  public rewardSlotNumberData: { rewardPosition: number }[] = [];
  public iSlices: ISlice[] = [];
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

  public get colorCtrls(): FormGroup {
    return (this.formSpin.get('colorCtrls') as FormGroup);
  }

  public get numberOfWedges(): AbstractControl {
    return this.formSpin.get(ControlsName.numberOfWedges);
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

  public get colorCtrlsToLoop(): any[] { // to type as the color object
    return Object.keys(this.colorCtrls.controls).slice(0, this.numberOfWedges.value);
  }

  constructor(
    private fb: FormBuilder,
    private routingState: RoutingStateService,
    private router: Router,
    private route: ActivatedRoute,
    private spinService: SpinService,
    private availableNewEngagementService: AvailableNewEngagementService,
    private cd: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {
  }

  public ngOnInit(): void {
    this.initTenants();
    this.createSpinForm();
    // console.log(this.colorCtrls.get('Wedge #1 Color'), 'i am next');
    console.log(this.colorCtrlsToLoop, 'here i am');
    combineLatest([this.getSpinData(), this.handleRouteParams()])
      .subscribe(
        ([previewData, spin]) => {
          console.log('i am inisde init subscribe, ', previewData, spin);
          this.spinData = previewData;
          this.rewardSlotNumbers = this.allRewardSlotNumbers = previewData.rewardSlots;
          const patchData = spin || this.getDefaultValue(previewData);
          this.formSpin.patchValue(patchData);
          this.cd.detectChanges();
        },
        (error: Error) => {
          console.warn(error.message);
          this.router.navigateByUrl('/engagements');
        }
      );
    this.subscribeSpinsNumberChanges();
    this.subscribeSpinSlotChanges();
    this.subscribeColorFormGroupControls();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  private createSpinForm(): void {
    this.formSpin = this.fb.group({
      name: ['Spin Wheel Template', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]
      ],
      headlineMessage: ['Spin the Wheel', [
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
      colorCtrls: this.fb.group(this.generateColorCtrls()),
      // color selection,
      rewardIcon: [null, [Validators.required]],
      wheelImg: [null, [Validators.required]],
      wheelPosition: [null, [Validators.required]],
      pointerImg: [null, [Validators.required]]
    });
  }

  private generateColorCtrls(): any {
    const rainbowColors = rainbowGenerator(this.MAX_WEDGES);
    // const arrayColors = rainbowColors.map((color, index) => ({ labelView: `Wedge #${index + 1} Color`, color }));
    return rainbowColors.reduce((obj, item, index) => {
      obj[index] = this.fb.control(item, [Validators.required]);
      return obj;
    }, {});
  }

  private subscribeColorFormGroupControls(): void {
    // UPDATE ISLICE OBJECT
    Object.keys(this.colorCtrls.controls).forEach(key => {
      this.colorCtrls.get(key).valueChanges.pipe(takeUntil(this.destroy$)).
        subscribe((value) => {
          // update ISlices
          this.iSlices[key].labelColor = value;
        });
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
          // console.log(value, 'current Spin number');
          this.iSlices = [];
          for (let i = 0; i < value; i++) {
            this.iSlices.push({
              id: `${i}`,
              labelColor: this.colorCtrls.get(`${i}`).value
            });
          }
          console.log(this.iSlices, 'my slices', typeof value);
          console.log(this.rewardSlotNumbers, 'first');
          this.rewardSlotNumbers = this.allRewardSlotNumbers.filter((slot) => +slot.value <= value); // not working
          console.log(this.rewardSlotNumbers, 'secon');
          console.log(this.rewardSlotNumbers, 'rewardsslstsNUMBER');
          this.formSpin.get('rewardSlots').patchValue([]);
          this.patchForm('rewardSlots', [this.rewardSlotNumbers[this.rewardSlotNumbers.length - 1].value]);
        });
  }

  private subscribeSpinSlotChanges(): void {
    this.formSpin.get(ControlsName.rewardSlots)
      .valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((value: number[]) => {
        if (!value) {
          return;
        }
        this.rewardSlotNumberData = value.map(
          (item: number) => ({rewardPosition: item - 1})
        );
      });
  }

  /*** END subscription to form value Changes ***/

  private getSpinData(): Observable<ISpinDefaultValue> {
    return this.spinService.getSpinData();
  }

  private getDefaultValue(data: ISpinDefaultValue): Partial<ISpinEntityForm> {
    return {
      rewardSlots: [data.rewardSlots[data.rewardSlots.length - 1].value],
      wedgeColorSelections: data.wedgeColorSelections,
      numberOfWedges: data.numberOfWedges[data.numberOfWedges.length - 6].value, // start with 4 color controls
      wheelPosition: data.wheelPosition,
      pointerImg: data.pointerImg,
      background: data.background
    };
  }

  /*** START ***/

  public save(): void {
    if (this.formSpin.invalid) {
      this.formSpin.markAllAsTouched();
      return;
    }
    this.simpleMobileViewComponent.createPreview()
      .pipe(
        switchMap((imageUrl: IUploadedFile) => {
          if (this.id) {
            return this.spinService.updateSpin(this.id, {...this.formSpin.value, image_url: imageUrl.url});
          }
          return this.spinService.createSpin({...this.formSpin.value, image_url: imageUrl.url}).pipe(
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
