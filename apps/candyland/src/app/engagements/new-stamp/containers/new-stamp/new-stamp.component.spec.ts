import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStampComponent } from './new-stamp.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { GameMobilePreviewStampModule } from '@cl-shared/components/game-mobile-preview-stamp/game-mobile-preview-stamp.module';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PuzzlesModule } from '@perxtech/core';
import { SimpleMobileViewModule } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.module';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DirectivesModule } from '@cl-shared/directives/directives.module';
import { CheckboxGroupModule } from '@cl-shared/components/checkbox-group/checkbox-group.module';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule, InfoHintModule } from '@perxtech/candyshop';
import { StampsService, TenantStoreService, UploadFileService } from '@cl-core-services';
import { TenantMockStore } from '@cl-shared/test-components/tenant-mock-store/tenant-mock-store';
import { MockStampsService } from '@cl-shared/test-components/providers/mock-stamps.service';
import { MockUploadFileService } from '@cl-shared/test-components/providers/mock-upload-file.service';
import { WINDOW } from '@cl-core/services/window.service';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestComponentsModule } from '@cl-shared/test-components/test-components.module';

describe('NewStampPageComponent', () => {
  let component: NewStampComponent;
  let fixture: ComponentFixture<NewStampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ImagesPreviewModule,
        ButtonModule,
        InfoHintModule,
        GameMobilePreviewStampModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        SimpleMobileViewModule,
        PuzzlesModule,

        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSliderModule,
        MatCheckboxModule,
        DirectivesModule,
        CheckboxGroupModule,
        TranslateModule.forRoot(),
        TestComponentsModule,
      ],
      declarations: [NewStampComponent],
      providers: [
        { provide: LocalStorageService, useValue: {} },
        { provide: TenantStoreService, useClass: TenantMockStore },
        { provide: StampsService, useClass: MockStampsService },
        { provide: UploadFileService, useClass: MockUploadFileService },
        {
          provide: WINDOW, useValue: {
            scrollTo(a: any, b: any): any {
              return { a, b };
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
