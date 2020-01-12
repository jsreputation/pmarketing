import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpinPageComponent } from './new-spin-page.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ImagesPreviewModule} from '@cl-shared/components/images-preview/images-preview.module';
import {ButtonModule} from '@cl-shared/components/button/button.module';
import {SelectGraphicModule} from '@cl-shared/components/select-graphic/select-graphic.module';
import {SelectGraphicWrapModule} from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import {GameModule} from '@perx/core';
import {SimpleMobileViewModule} from '@cl-shared/components/simple-mobile-view/simple-mobile-view.module';
import {MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule} from '@angular/material';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CheckboxGroupModule } from '@cl-shared/components/checkbox-group/checkbox-group.module';
import {ClColorPickerModule} from '@cl-shared/components/cl-color-picker/cl-color-picker.module';
import {LocalStorageService} from '@cl-core/services/local-storage.service';
import { TenantStoreService } from '@cl-core-services';
import { TenantMockStore } from '@cl-shared/test-components/tenant-mock-store/tenant-mock-store';

describe('NewSpinPageComponent', () => {
  let component: NewSpinPageComponent;
  let fixture: ComponentFixture<NewSpinPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSpinPageComponent ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ClColorPickerModule,
        ImagesPreviewModule,
        ButtonModule,
        MatCheckboxModule,
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
        MatSliderModule,
        CheckboxGroupModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        LocalStorageService,
        { provide: TenantStoreService, useClass: TenantMockStore }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
