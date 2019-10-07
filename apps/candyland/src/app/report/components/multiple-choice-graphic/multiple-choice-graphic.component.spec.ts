import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleChoiceGraphicComponent } from './multiple-choice-graphic.component';

describe('MultipleChoiceGraphicComponent', () => {
  let component: MultipleChoiceGraphicComponent;
  let fixture: ComponentFixture<MultipleChoiceGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChoiceGraphicComponent ]
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
