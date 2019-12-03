import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { settingsFonts, SettingsService, settingsStyles } from '@cl-core/services';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { IReward } from '@perx/core';
import { IWTenantDisplayProperties } from '@perx/whistler';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cl-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent implements OnInit, OnDestroy {
  public styles: ISimpleValue[] = settingsStyles;
  public fonts: ISimpleValue[] = settingsFonts;
  public formBranding: FormGroup;
  public listColors: { labelView: string, color: string }[];
  public listColorsText: {
    labelView: string, color: string
  }[];
  public tenants: Tenants;
  public mockReward: IReward = this.settingsService.getMockReward();
  public reward$: Observable<any> = of(this.mockReward);
  public rewards$: Observable<any> = of([this.mockReward, this.mockReward]);
  public tabsLabels: string[];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private settingsService: SettingsService,
    private translate: TranslateService) {
  }

  public get headerNavbarColor(): AbstractControl {
    return this.formBranding.get('headerNavbarColor');
  }

  public get primaryColor(): AbstractControl {
    return this.formBranding.get('primaryColor');
  }

  public get secondaryColor(): AbstractControl {
    return this.formBranding.get('secondaryColor');
  }

  public get logoType(): AbstractControl {
    return this.formBranding.get('logoType');
  }

  public get logo(): AbstractControl {
    return this.formBranding.get('logo');
  }

  public get buttonBackgroundColor(): AbstractControl {
    return this.formBranding.get('buttonBackgroundColor');
  }

  public get buttonTextColor(): AbstractControl {
    return this.formBranding.get('buttonTextColor');
  }

  public get font(): AbstractControl {
    return this.formBranding.get('font');
  }

  public get style(): AbstractControl {
    return this.formBranding.get('style');
  }

  public ngOnInit(): void {
    this.getTranslationTabsLable();
    this.createFormBranding();
    this.getTenants();
    this.listColors = [{
      labelView: 'Primary Color', color: this.primaryColor.value
    },
    {
      labelView: 'Secondary Color', color: this.secondaryColor.value
    }
    ];
    this.listColorsText = [{
      labelView: 'Black', color: '#000000'
    },
    {
      labelView: 'White', color: '#ffffff'
    }];

    this.patchValue({
      headerNavbarColor: this.listColors[0],
      buttonBackgroundColor: this.listColors[0],
      buttonTextColor: this.listColorsText[0]
    });
    this.subscribeChangeColors();
  }

  private getTranslationTabsLable(): void {
    this.translate.get('SETTINGS_FEATURE')
      .pipe(takeUntil(this.destroy$))
      .subscribe((translates: any) => {
        this.tabsLabels = [translates.LOGIN, translates.HOME, translates.REWARD_DETAIL];
      });
  }

  private createFormBranding(): void {
    this.formBranding = this.settingsService.getFormBranding();
  }

  private patchValue(data: Partial<IBrandingForm>): void {
    this.formBranding.patchValue(data);
  }

  private subscribeChangeColors(): void {
    this.primaryColor
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.listColors[0].color = val;
      });
    this.secondaryColor
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => {
        this.listColors[1].color = val;
      });
  }

  private getTenants(): void {
    this.settingsService.getTenants()
      .subscribe((res: Tenants) => {
        this.tenants = res;
        this.handlerValue(res.display_properties);
      });
  }

  private subscribeFormChanges(): void {
    this.formBranding
      .valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value => {
          if (this.formBranding.valid) {
            return this.settingsService.updateTenants(SettingsHttpAdapter.transformSettingsBrandingFormToAPI(value));
          }
          return of([]);
        })),
        takeUntil(this.destroy$),
      )
      .subscribe(() => { });
  }

  private handlerValue(data: IWTenantDisplayProperties): void {
    if (!data['theme.primary'] || !data['theme.style']) {
      this.setDefaultValue(data);
    } else {
      this.changeDefaultColors(data);
      const patchFormValue = SettingsHttpAdapter.transformSettingsBrandingToForm(data, this.listColors, this.listColorsText);
      this.patchValue(patchFormValue);
      this.subscribeFormChanges();
    }
  }

  private setDefaultValue(data: any): void {
    const defaultValue = this.prepareDefaultValue(data);
    this.tenants.display_properties = { ...this.tenants.display_properties, ...defaultValue };
    this.tenants.save()
      .subscribe(() => {
        this.subscribeFormChanges();
      });
  }

  private prepareDefaultValue(data: any): any {
    return this.settingsService.prepareDefaultValue(data);
  }

  private changeDefaultColors(data: any): void {
    this.listColors[0].color = data['theme.primary'];
    this.listColors[1].color = data['theme.accent'];
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
