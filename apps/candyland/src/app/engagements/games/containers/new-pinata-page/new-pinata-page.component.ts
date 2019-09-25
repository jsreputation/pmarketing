import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { ControlsName } from '../../../../models/controls-name';
import {
  AvailableNewEngagementService, PinataService, RoutingStateService, SettingsService
} from '@cl-core/services';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';

@Component({
  selector: 'cl-new-pinata-page',
  templateUrl: './new-pinata-page.component.html',
  styleUrls: ['./new-pinata-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPinataPageComponent implements OnInit, OnDestroy {
  public formPinata: FormGroup;
  public pinataData$: Observable<{
    pinata: IGraphic[],
    background: IGraphic[]
  }>;
  public tenantSettings: ITenantsProperties;
  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private pinataService: PinataService,
    private routingState: RoutingStateService,
    private availableNewEngagementService: AvailableNewEngagementService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {
  }

  public ngOnInit(): void {
    this.getTenants();
    this.createPinataForm();
    this.getPinataData();
  }

  public save(): void {
    this.pinataService.createPinata(this.formPinata.value)
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

  public get name(): AbstractControl {
    return this.formPinata.get(ControlsName.name);
  }

  public get headlineMessage(): AbstractControl {
    return this.formPinata.get(ControlsName.headlineMessage);
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.formPinata.get(ControlsName.subHeadlineMessage);
  }

  public get buttonText(): AbstractControl {
    return this.formPinata.get(ControlsName.buttonText);
  }

  public get background(): AbstractControl {
    return this.formPinata.get(ControlsName.background);
  }

  public get pinata(): AbstractControl {
    return this.formPinata.get(ControlsName.pinata);
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  private createPinataForm(): void {
    this.formPinata = this.fb.group({
      name: ['Hit the Pinata Template', [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(60)]
      ],
      headlineMessage: ['Tap the Piñata and Win!', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      subHeadlineMessage: ['Tap the piñata until you get a reward!', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      pinata: [null, [Validators.required]],
      background: [null, [Validators.required]],
      buttonText: ['start playing', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getPinataData(): void {
    this.pinataData$ = this.pinataService.getPinataData()
      .pipe(
        tap((res) => {
          this.formPinata.patchValue({
            [ControlsName.pinata]: res.pinata[0],
            [ControlsName.background]: res.background[0]
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
