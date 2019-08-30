import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpireTimerComponent } from './expire-timer.component';

describe('ExpireTimerComponent', () => {
  let component: ExpireTimerComponent;
  let fixture: ComponentFixture<ExpireTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpireTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpireTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
