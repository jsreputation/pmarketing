import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceGraphicComponent } from './multiple-choice-graphic.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('MultipleChoiceGraphicComponent', () => {
  let component: MultipleChoiceGraphicComponent;
  let fixture: ComponentFixture<MultipleChoiceGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [MultipleChoiceGraphicComponent],
        imports: [TranslateModule.forRoot()],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
