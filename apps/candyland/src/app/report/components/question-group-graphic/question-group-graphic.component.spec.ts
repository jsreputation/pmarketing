import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupGraphicComponent } from './question-group-graphic.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('QuestionGroupGraphicComponent', () => {
  let component: QuestionGroupGraphicComponent;
  let fixture: ComponentFixture<QuestionGroupGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [QuestionGroupGraphicComponent],
        imports: [TranslateModule.forRoot()],
        schemas: [NO_ERRORS_SCHEMA]
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
