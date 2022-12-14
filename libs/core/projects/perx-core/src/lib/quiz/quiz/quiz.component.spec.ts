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
import { QuizLongTextComponent } from '../question/long-text/long-text.component';
import { QuizPictureSelectComponent } from '../question/picture-select/picture-select.component';
import { QuizQuestionComponent } from '../question/question.component';
import { QuizRatingComponent } from '../question/rating/rating.component';
import { QuizSelectComponent } from '../question/select/select.component';
import { QuizSwipeListComponent } from '../question/swipe-list/swipe-list.component';
import { QuizComponent } from './quiz.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';


describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuizComponent,
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
        FormsModule,
        MatListModule,
        ReactiveFormsModule,
        PinchZoomModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
