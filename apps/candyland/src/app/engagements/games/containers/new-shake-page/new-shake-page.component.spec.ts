import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShakePageComponent } from './new-shake-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import {
  MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule
} from '@angular/material';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameModule } from '@perx/core';
import { SimpleMobileViewModule } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.module';
import { ShakeTreeService, TenantStoreService } from '@cl-core/services';
import { ConfirmModalModule } from '@cl-shared';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { DirectivesModule } from '@cl-shared/directives/directives.module';
import { WINDOW } from '@cl-core/services/window.service';
import { TranslateModule } from '@ngx-translate/core';
import { TenantMockStore } from '@cl-shared/test-components/tenant-mock-store/tenant-mock-store';

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
        SimpleMobileViewModule,
        MatTabsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        HttpClientTestingModule,
        MatDialogModule,
        ConfirmModalModule,
        DirectivesModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ NewShakePageComponent ],
      providers: [
        {
          provide: ShakeTreeService, useValue: {
            getData: () => of({
              gameNumberGift: [{
                value: '3',
                viewValue: '3 gifts'
              }],
              gamesTree: [{
                id: 1,
                type: 'simple-tree',
                active: 'false',
                img: 'assets/images/games/tree/simple-tree.png',
                fullImg: 'assets/images/games/tree/full_tree_1.png',
                title: 'tree'
              }],
              giftBox: [{
                id: 1,
                type: 'state1',
                title: 'icon',
                img: 'assets/images/gifts/state1.png',
                format: '.png',
                active: 'false'
              }],
              background: [ {
                id: 1,
                type: 'background1',
                title: 'icon',
                img: 'assets/images/background/background1.png',
                fullImg: 'assets/images/background/full_bg_1.jpg',
                format: '.png',
                active: 'false'
              }]
            }),
          }
        },
        {
          provide: EngagementHttpAdapter,
          useValue: {}
        },
        {provide: LocalStorageService, useValue: {}},
        { provide: WINDOW, useValue: {
            scrollTo(a: any, b: any): any { return {a, b}; }
          }
        },
        { provide: TenantStoreService, useClass: TenantMockStore }
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
