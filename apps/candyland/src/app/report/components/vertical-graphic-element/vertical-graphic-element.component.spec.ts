import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalGraphicElementComponent } from './vertical-graphic-element.component';

describe('VerticalGraphicElementComponent', () => {
  let component: VerticalGraphicElementComponent;
  let fixture: ComponentFixture<VerticalGraphicElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalGraphicElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalGraphicElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
