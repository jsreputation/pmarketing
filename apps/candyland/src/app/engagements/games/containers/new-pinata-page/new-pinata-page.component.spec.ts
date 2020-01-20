import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPinataPageComponent } from './new-pinata-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import {
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameModule } from '@perx/core';
import { SimpleMobileViewModule } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.module';
import { ConfirmModalModule } from '@cl-shared';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { PinataService, TenantStoreService } from '@cl-core-services';
import { TenantMockStore } from '@cl-shared/test-components/tenant-mock-store/tenant-mock-store';
import { MockPinataService } from '@cl-shared/test-components/providers/mock-pinata.service';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { WINDOW_PROVIDERS } from '@cl-core/services/window.service';

describe('NewPinataPageComponent', () => {
  let component: NewPinataPageComponent;
  let fixture: ComponentFixture<NewPinataPageComponent>;

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
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        HttpClientTestingModule,
        MatDialogModule,
        ConfirmModalModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ NewPinataPageComponent ],
      providers: [
        { provide: LocalStorageService, useValue: {} },
        { provide: TenantStoreService, useClass: TenantMockStore },
        { provide: PinataService, useClass: MockPinataService },
        WINDOW_PROVIDERS
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPinataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
