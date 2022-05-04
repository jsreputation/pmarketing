import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { QuizModule, SecondsToStringPipe, TokenStorage, UtilsModule, ConfigService, SettingsService } from '@perxtech/core';
import { QuizResultsComponent } from './quiz-results.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('QuizResultsComponent', () => {
  let component: QuizResultsComponent;
  let fixture: ComponentFixture<QuizResultsComponent>;

  const configServiceStub: Partial<ConfigService> = { readAppConfig: () => of() };

  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of({
      showPrizeSetOutcome: true
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizResultsComponent],
      imports: [
        QuizModule,
        MatCardModule,
        MatToolbarModule,
        RouterTestingModule,
        UtilsModule,
        TranslateModule.forRoot(),
        MatDialogModule,
      ],
      providers: [
        { provide: TokenStorage, useValue: {} },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
        SecondsToStringPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
