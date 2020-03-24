import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuckyDrawDetailsComponent } from './lucky-draw-details.component';

describe('LuckyDrawDetailsComponent', () => {
  let component: LuckyDrawDetailsComponent;
  let fixture: ComponentFixture<LuckyDrawDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuckyDrawDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuckyDrawDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
