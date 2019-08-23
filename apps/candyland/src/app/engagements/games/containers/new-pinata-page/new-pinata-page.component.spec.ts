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
      ],
      declarations: [ NewPinataPageComponent ]
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
