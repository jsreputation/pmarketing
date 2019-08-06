import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShakePageComponent } from './new-shake-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { ShakeDataService } from './shared/services/shake-data.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameModule } from '../../../../../../../../libs/perx-core/dist/perx-core';

describe('NewShakePageComponent', () => {
  let component: NewShakePageComponent;
  let fixture: ComponentFixture<NewShakePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ImagesPreviewModule,
        ButtonModule,
        SelectGraphicModule,
        SelectGraphicWrapModule,
        GameModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        HttpClientTestingModule,
      ],
      declarations: [ NewShakePageComponent ],
      providers: [
        {
          provide: ShakeDataService, useValue: {
            getBackground: () => of([]),
            getGiftBox: () => of([]),
            getGamesTree: () => of([]),
            getGameNumberGifts: () => of([]),
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShakePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
