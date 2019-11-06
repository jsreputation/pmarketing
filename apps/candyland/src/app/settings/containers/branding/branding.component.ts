import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { Observable, of, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';

import { settingsFonts, SettingsService, settingsStyles } from '@cl-core/services';
import { Tenants } from '@cl-core/http-adapters/setting-json-adapter';
import { SettingsHttpAdapter } from '@cl-core/http-adapters/settings-http-adapter';
import { IReward } from '@perx/core';

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
  private destroy$: Subject<void> = new Subject<void>();
  public tenants: Tenants;
  public mockReward: IReward = this.settingsService.getMockReward();
  public reward$: Observable<any> = of(this.mockReward);
  public rewards$: Observable<any> = of([this.mockReward, this.mockReward]);
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
    }
    ];
    this.listColorsText = [{
      labelView: 'Black', color: '#000000'
    },
    {
      labelView: 'White', color: '#ffffff'
    }];
    // i think is because of ehre ngOnInit went to patch back
    this.patchValue({
      headerNavbarColor: this.listColors[0],
      buttonBackgroundColor: this.listColors[0],
      buttonTextColor: this.listColorsText[0]
    });
    this.subscribeChangeColors();
  }

  private createFormBranding(): void {
    this.formBranding = this.settingsService.getFormBranding();
  }

  private patchValue(data: Partial<IBrandingForm>): void {
    console.log(data, 'i am doing patching');
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
      .subscribe(() => {
      });
  }

  private handlerValue(data: any): void {
    if (!data['theme.primary'] || !data['theme.style']) {
      this.setDefaultValue(data);
    } else {
      this.changeDefaultColors(data);
      console.log(data, ' i have data i am patchign differently');
      const patchFormValue = SettingsHttpAdapter.transformSettingsBrandingToForm(data, this.listColors, this.listColorsText);
      console.log(patchFormValue, 'this is the data that will be patched')
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
