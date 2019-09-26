import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPictureChoiceFieldComponent } from './question-picture-choice-field.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatSlideToggleModule } from '@angular/material';
import { UploadImageComponent } from '@cl-shared/questions/question-picture-choice-field/upload-image/upload-image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('QuestionPictureChoiceFieldComponent', () => {
  let component: QuestionPictureChoiceFieldComponent;
  let fixture: ComponentFixture<QuestionPictureChoiceFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,

        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSlideToggleModule
      ],
      declarations: [
        QuestionPictureChoiceFieldComponent,
        UploadImageComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPictureChoiceFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
