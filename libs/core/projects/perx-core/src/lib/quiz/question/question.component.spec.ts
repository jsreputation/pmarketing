import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { QuizLongTextComponent } from './long-text/long-text.component';
import { QuizPictureSelectComponent } from './picture-select/picture-select.component';
import { QuizQuestionComponent } from './question.component';
import { QuizRatingComponent } from './rating/rating.component';
import { QuizSelectComponent } from './select/select.component';
import { QuizSwipeListComponent } from './swipe-list/swipe-list.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { ThemesService } from '@perxtech/core';
import { of } from 'rxjs';

describe('QuizQuestionComponent', () => {
  let component: QuizQuestionComponent;
  let fixture: ComponentFixture<QuizQuestionComponent>;
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuizQuestionComponent,
        QuizSelectComponent,
        QuizRatingComponent,
        QuizPictureSelectComponent,
        QuizLongTextComponent,
        QuizSwipeListComponent
      ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatRadioModule,
        MatListModule,
        FormsModule,
        MatListModule,
        ReactiveFormsModule,
        PinchZoomModule
      ],
      providers: [
        { provide: ThemesService, useValue: themesServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
