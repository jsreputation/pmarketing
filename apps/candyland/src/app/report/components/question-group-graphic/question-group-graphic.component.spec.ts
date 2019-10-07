import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupGraphicComponent } from './question-group-graphic.component';

describe('QuestionGroupGraphicComponent', () => {
  let component: QuestionGroupGraphicComponent;
  let fixture: ComponentFixture<QuestionGroupGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionGroupGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionGroupGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
