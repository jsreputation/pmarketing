import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstantRewardAppearancePageComponent } from './new-instant-reward-appearance-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import { InfoHintModule } from '@cl-shared/components/info-hint/info-hint.module';
import { GameMobilePreviewModule } from '@cl-shared/components/game-mobile-preview/game-mobile-preview.module';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule, MatRadioModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewInstantRewardAppearancePageComponent', () => {
  let component: NewInstantRewardAppearancePageComponent;
  let fixture: ComponentFixture<NewInstantRewardAppearancePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ImagesPreviewModule,
        ButtonModule,
        SelectGraphicModule,
        SelectGraphicWrapModule,
        InfoHintModule,
        GameMobilePreviewModule,
        HttpClientTestingModule,
        RouterTestingModule,

        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
      ],
      declarations: [ NewInstantRewardAppearancePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInstantRewardAppearancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
