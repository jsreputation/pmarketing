import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceComponent } from './performance.component';
import { MatTabsModule } from '@angular/material/tabs';
import {
  DefaultLangChangeEvent,
  LangChangeEvent,
  TranslateModule,
  TranslateService,
  TranslationChangeEvent
} from '@ngx-translate/core';
import { OverviewComponent } from './overview/overview.component';
import { ActivityComponent } from './activity/activity.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { EventEmitter } from '@angular/core';

const translateServiceStub: Partial<TranslateService> = {
  get: () => of(),
  // @ts-ignore
  onLangChange: new EventEmitter<LangChangeEvent>(),
  // @ts-ignore
  onTranslationChange: new EventEmitter<TranslationChangeEvent>(),
  // @ts-ignore
  onDefaultLangChange: new EventEmitter<DefaultLangChangeEvent>()
};

describe('PerformanceComponent', () => {
  let component: PerformanceComponent;
  let fixture: ComponentFixture<PerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PerformanceComponent,
        OverviewComponent,
        ActivityComponent,
      ],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatTabsModule,
        TranslateModule.forRoot(),
        InfiniteScrollModule
      ],
      providers: [
        { provide: TranslateService, useValue: translateServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
