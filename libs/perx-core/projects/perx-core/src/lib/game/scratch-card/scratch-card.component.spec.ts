import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchCardComponent } from './scratch-card.component';

describe('ScratchCardComponent', () => {
  let component: ScratchCardComponent;
  let fixture: ComponentFixture<ScratchCardComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScratchCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScratchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('distanceBetween', () => {
    expect(component.distanceBetween({ x: 1, y: 2 }, { x: 3, y: 4 })).toBeTruthy();
  });

  it('distanceBetween', () => {
    expect(component.angleBetween({ x: 1, y: 2 }, { x: 3, y: 4 })).toBeTruthy();
  });

  it('getFilledInPixels', () => {
    component.canvas.width = 50;
    component.canvas.height = 130;
    expect(component.getFilledInPixels(5)).toBeTruthy();
    // @ts-ignore
    component.canvas = null;
    expect(component.getFilledInPixels(5)).toBe(0);
  });
});
