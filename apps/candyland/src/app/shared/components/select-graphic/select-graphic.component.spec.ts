import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGraphicComponent } from './select-graphic.component';

describe('SelectGraphicComponent', () => {
  let component: SelectGraphicComponent;
  let fixture: ComponentFixture<SelectGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
