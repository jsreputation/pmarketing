import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

import { GameModule } from '@perx/core';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import { SimpleMobileViewModule } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.module';

import { NewScratchPageComponent } from './new-scratch-page.component';

import { SettingsMobilePreviewModule } from '../../../../settings/components/settings-mobile-preview/settings-mobile-preview.module';
import { TranslateModule } from '@ngx-translate/core';
import { TenantStoreService } from '@cl-core-services';
import { TenantMockStore } from '@cl-shared/test-components/tenant-mock-store/tenant-mock-store';

describe('NewScratchComponent', () => {
  let component: NewScratchPageComponent;
  let fixture: ComponentFixture<NewScratchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ImagesPreviewModule,
        ButtonModule,
        SelectGraphicModule,
        SelectGraphicWrapModule,
        GameModule,
        SimpleMobileViewModule,
        SettingsMobilePreviewModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        NewScratchPageComponent,
      ],
      providers: [
        {provide: LocalStorageService, useValue: {}},
        { provide: TenantStoreService, useClass: TenantMockStore }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScratchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
