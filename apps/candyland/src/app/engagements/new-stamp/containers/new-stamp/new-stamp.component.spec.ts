import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStampComponent } from './new-stamp.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import { InfoHintModule } from '@cl-shared/components/info-hint/info-hint.module';
import { GameMobilePreviewStampModule } from '@cl-shared/components/game-mobile-preview-stamp/game-mobile-preview-stamp.module';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PuzzlesModule } from '@perx/core';
import { SimpleMobileViewModule } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.module';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DirectivesModule } from '@cl-shared/directives/directives.module';
import { CheckboxGroupModule } from '@cl-shared/components/checkbox-group/checkbox-group.module';
import { TranslateModule } from '@ngx-translate/core';
import { TenantStoreService } from '@cl-core-services';
import { TenantMockStore } from '@cl-shared/test-components/tenant-mock-store/tenant-mock-store';

describe('NewStampPageComponent', () => {
  let component: NewStampComponent;
  let fixture: ComponentFixture<NewStampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ImagesPreviewModule,
        ButtonModule,
        SelectGraphicModule,
        SelectGraphicWrapModule,
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
      ],
      declarations: [ NewStampComponent ],
      providers: [
        {provide: LocalStorageService, useValue: {}},
        { provide: TenantStoreService, useClass: TenantMockStore }
      ]
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
