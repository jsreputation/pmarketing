import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPinataPageComponent } from './new-pinata-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import {
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GameModule } from '@perxtech/core';
import { SimpleMobileViewModule } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.module';
import { ConfirmModalModule } from '@cl-shared';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from '@perxtech/candyshop';
import { PinataService, TenantStoreService, UploadFileService } from '@cl-core-services';
import { TenantMockStore } from '@cl-shared/test-components/tenant-mock-store/tenant-mock-store';
import { MockPinataService } from '@cl-shared/test-components/providers/mock-pinata.service';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { WINDOW } from '@cl-core/services/window.service';
import { MockUploadFileService } from '@cl-shared/test-components/providers/mock-upload-file.service';
import { TestComponentsModule } from '@cl-shared/test-components/test-components.module';

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
        TestComponentsModule
      ],
      declarations: [NewPinataPageComponent],
      providers: [
        { provide: LocalStorageService, useValue: {} },
        { provide: TenantStoreService, useClass: TenantMockStore },
        { provide: PinataService, useClass: MockPinataService },
        { provide: UploadFileService, useClass: MockUploadFileService },
        {
          provide: WINDOW, useValue: {
            scrollTo(a: any, b: any): any { return { a, b }; }
          }
        }
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
