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
import { ButtonModule } from '@perx/candyshop';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { SimpleMobileViewModule } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.module';

import { NewScratchPageComponent } from './new-scratch-page.component';

import { SettingsMobilePreviewModule } from '../../../../settings/components/settings-mobile-preview/settings-mobile-preview.module';
import { TranslateModule } from '@ngx-translate/core';
import { ScratchService, TenantStoreService, UploadFileService } from '@cl-core-services';
import { TenantMockStore } from '@cl-shared/test-components/tenant-mock-store/tenant-mock-store';
import { MockScratchService } from '@cl-shared/test-components/providers/mock-scratch.service';
import { MockUploadFileService } from '@cl-shared/test-components/providers/mock-upload-file.service';
import { WINDOW } from '@cl-core/services/window.service';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material';
import { TestComponentsModule } from '@cl-shared/test-components/test-components.module';
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
        GameModule,
        SimpleMobileViewModule,
        SettingsMobilePreviewModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        TestComponentsModule
      ],
      declarations: [
        NewScratchPageComponent,
      ],
      providers: [
        {provide: LocalStorageService, useValue: {}},
        { provide: TenantStoreService, useClass: TenantMockStore },
        { provide: ScratchService, useClass: MockScratchService },
        { provide: UploadFileService, useClass: MockUploadFileService },
        { provide: WINDOW, useValue: {
            scrollTo(a: any, b: any): any { return {a, b}; }
          }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
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
