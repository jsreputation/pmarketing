import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTextGraphicComponent } from './long-text-graphic.component';

describe('LongTextGraphicComponent', () => {
  let component: LongTextGraphicComponent;
  let fixture: ComponentFixture<LongTextGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTextGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTextGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
