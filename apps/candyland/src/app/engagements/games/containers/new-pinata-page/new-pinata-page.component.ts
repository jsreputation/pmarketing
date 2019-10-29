import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { combineLatest, Observable, of, Subject } from 'rxjs';
import { tap, map, switchMap, takeUntil } from 'rxjs/operators';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ControlsName } from '../../../../models/controls-name';
import {
  AvailableNewEngagementService, PinataService, RoutingStateService, SettingsService
} from '@cl-core/services';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { SimpleMobileViewComponent } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.component';

@Component({
  selector: 'cl-new-pinata-page',
  templateUrl: './new-pinata-page.component.html',
  styleUrls: ['./new-pinata-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPinataPageComponent implements OnInit, OnDestroy {
  @ViewChild(SimpleMobileViewComponent, { static: false }) public simpleMobileViewComponent: SimpleMobileViewComponent;

  private destroy$: Subject<any> = new Subject();

  public id: string;
  public form: FormGroup;
  public pinataData: IGameDefaultData;
  public tenantSettings: ITenantsProperties;

  public get name(): AbstractControl {
    return this.form.get(ControlsName.name);
  }

  public get headlineMessage(): AbstractControl {
    return this.form.get(ControlsName.headlineMessage);
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.form.get(ControlsName.subHeadlineMessage);
  }

  public get buttonText(): AbstractControl {
    return this.form.get(ControlsName.buttonText);
  }

  public get background(): AbstractControl {
    return this.form.get(ControlsName.background);
  }

  public get pinata(): AbstractControl {
    return this.form.get(ControlsName.pinata);
  }

  constructor(
    private fb: FormBuilder,
    private pinataService: PinataService,
    private routingState: RoutingStateService,
    private availableNewEngagementService: AvailableNewEngagementService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private settingsService: SettingsService
  ) {
  }

  public ngOnInit(): void {
    this.getTenants();
    this.createPinataForm();
    combineLatest([this.getPinataData(), this.handleRouteParams()])
      .subscribe(
        ([previewData, pinata]) => {
          this.pinataData = previewData;
          const patchData = pinata || this.getDefaultValue(previewData);
          this.form.patchValue(patchData);
          this.cd.detectChanges();
        },
        (error: Error) => {
          console.warn(error.message);
          this.router.navigateByUrl('/engagements');
        }
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.simpleMobileViewComponent.createPreview()
      .pipe(
        switchMap((imageUrl: IUploadedFile) => {
          if (this.id) {
            return this.pinataService.updatePinata(this.id, { ...this.form.value, image_url: imageUrl.url });
          }
          return this.pinataService.createPinata({ ...this.form.value, image_url: imageUrl.url }).pipe(
            map((engagement: IResponseApi<IEngagementApi>) => EngagementHttpAdapter.transformEngagement(engagement.data)),
            tap((data: IEngagement) => this.availableNewEngagementService.setNewEngagement(data))
          );
        })
      ).pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigateByUrl('/engagements'));
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  public getImgLink(control: FormControl, defaultImg: string): string {
    return ImageControlValue.getImgLink(control, defaultImg);
  }

  private createPinataForm(): void {
    this.form = this.fb.group({
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
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      pinata: [null, [Validators.required]],
      background: [null, [
      ]],
      buttonText: ['start playing', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getDefaultValue(data: IGameDefaultData): IPinataForm {
    return {
      name: 'Hit the Pinata Template',
      headlineMessage: 'Tap the Piñata and Win!',
      subHeadlineMessage: 'Tap the piñata until you get a reward!',
      buttonText: 'Start Playing',
      [ControlsName.pinata]: data.pinata[0],
      [ControlsName.background]: data.background[0],
      image_url: null
    };
  }

  private getPinataData(): Observable<IGameDefaultData> {
    return this.pinataService.getPinataData();
  }

  private getTenants(): void {
    this.settingsService.getTenants()
      .subscribe((res: Tenants) => {
        this.tenantSettings = SettingsHttpAdapter.getTenantsSettings(res);
        this.cd.detectChanges();
      });
  }

  private handleRouteParams(): Observable<null | IPinataForm> {
    return this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      tap(id => this.id = id),
      switchMap(id => {
        if (id) {
          return this.pinataService.getPinata(id);
        }
        return of(null);
      }),
      tap(pinata => this.checkGameType(pinata)),
      takeUntil(this.destroy$),
    );
  }

  private checkGameType(pinata: IPinataForm): void {
    if (pinata && pinata.gameType !== 'tap') {
      console.warn('Wrong type of game!');
      this.router.navigateByUrl('/engagements');
    }
  }
}
