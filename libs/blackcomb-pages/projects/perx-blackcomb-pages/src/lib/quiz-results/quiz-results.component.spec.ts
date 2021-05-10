import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { QuizModule, SecondsToStringPipe, TokenStorage, UtilsModule } from '@perxtech/core';
import { QuizResultsComponent } from './quiz-results.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

describe('QuizResultsComponent', () => {
  let component: QuizResultsComponent;
  let fixture: ComponentFixture<QuizResultsComponent>;

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
