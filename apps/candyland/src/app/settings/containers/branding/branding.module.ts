import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandingComponent } from './branding.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { SettingsMobilePreviewModule } from '../../components/settings-mobile-preview/settings-mobile-preview.module';
import { ClColorPickerModule } from '@cl-shared/components/cl-color-picker/cl-color-picker.module';
import { UploadGraphicModule } from '@cl-shared/components/upload-graphic/upload-graphic.module';
import { SimpleMobileViewModule } from '@cl-shared';
import { RewardsModule as PerxRewardsModule, RewardsService, ThemesService } from '@perxtech/core';
import { DirectivesModule } from '@cl-shared/directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

const rewardsServiceStub: Partial<RewardsService> = {};
const themesServiceStub: Partial<ThemesService> = {
  getThemeSetting: () => of()
};

@NgModule({
  declarations: [BrandingComponent],
  exports: [BrandingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsMobilePreviewModule,
    ClColorPickerModule,
    UploadGraphicModule,
    SimpleMobileViewModule,
    PerxRewardsModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    DirectivesModule,
    TranslateModule,
  ],
  providers: [
    { provide: RewardsService, useValue: rewardsServiceStub },
    { provide: ThemesService, useValue: themesServiceStub }
  ]
})
export class BrandingModule { }
