import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { settingsFonts, SettingsService, settingsStyles } from '@cl-core/services';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';

@Component({
  selector: 'cl-branding',
  templateUrl: './branding.component.html',
  styleUrls: ['./branding.component.scss']
})
export class BrandingComponent implements OnInit, OnDestroy {
  public styles: ISimpleValue[] = settingsStyles;
  public fonts: ISimpleValue[] = settingsFonts;
  public formBranding: FormGroup;
  public listColors;
  private destroy$ = new Subject<void>();
  public tenants: Tenants;
  public reward = of(  {
    id: 1,
    name: 'Starbucks venti $5',
    subtitle: 'So yummy',
    description: 'One bought, one offered',
    validFrom: null,
    validTo: null,
    rewardThumbnail: 'https://picsum.photos/300/300',
    rewardBanner: 'https://picsum.photos/200/300',
    merchantImg: 'https://picsum.photos/200/300',
    termsAndConditions: '',
    howToRedeem: '',
    rewardPrice: [{
      id: 23,
      currencyCode: '44',
      price: 3
    }],
    categoryTags: [{
      id: 34,
      title: 'Lifestyle',
      parent: null
    }],
  });
  constructor(private settingsService: SettingsService) {
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

  public get button_background_color(): AbstractControl {
    return this.formBranding.get('button_background_color');
  }

  public get button_text_color(): AbstractControl {
    return this.formBranding.get('button_text_color');
  }

  public get font(): AbstractControl {
    return this.formBranding.get('font');
  }

  public get style(): AbstractControl {
    return this.formBranding.get('style');
  }

  // public resetLogo(): void {
  //   this.logo.reset();
  //   this.logo.setValidators([Validators.required]);
  //   this.formBranding.updateValueAndValidity();
  //   this.logo.markAsUntouched({onlySelf: true});
  // }

  public ngOnInit(): void {
    this.createFormBranding();
    this.getTenants();
    this.listColors = [{
      labelView: 'Primary Color', color: this.primaryColor.value
    },
    {
      labelView: 'Secondary Color', color: this.secondaryColor.value
    }];
    this.patchValue({
      headerNavbarColor: this.listColors[0],
      button_background_color: this.listColors[0],
    });
    this.subscribeChangeColors();
  }

  private createFormBranding(): void {
    this.formBranding = this.settingsService.getFormBranding();
  }

  private patchValue(data): void {
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
        untilDestroyed(this),
        switchMap((value => {
          if (this.formBranding.valid) {
            return this.settingsService.updateTenants(SettingsHttpAdapter.transformSettingsBrandingFormToAPI(value));
          }
          return of([]);
        }))
      )
      .subscribe(() => {
      });
  }

  private handlerValue(data: any): void {
    if (!data['theme.primary'] || !data['theme.style']) {
      this.setDefaultValue(data);
    } else {
      this.changeDefaultColors(data);
      const patchFormValue = SettingsHttpAdapter.transformSettingsBrandingToForm(data, this.listColors);
      this.patchValue(patchFormValue);
      this.subscribeFormChanges();
    }
  }

  private setDefaultValue(data: any): void {
      const defaultValue = this.prepareDefaultValue(data);
      this.tenants.display_properties = {...this.tenants.display_properties, ...defaultValue};
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
