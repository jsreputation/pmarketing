import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeComponent } from 'src/app/shared/questions/question-type/question-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@perx/candyshop';
import { MatIconModule, MatSelectModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('QuestionTypeComponent', () => {
  let component: QuestionTypeComponent;
  let fixture: ComponentFixture<QuestionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ButtonModule,
        HttpClientTestingModule,

        MatSelectModule,
        MatIconModule,
        TranslateModule.forRoot()
      ],
      declarations: [ QuestionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
