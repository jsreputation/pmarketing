import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGameCardComponent } from './dashboard-game-card.component';

describe('DashboardGameCardComponent', () => {
  let component: DashboardGameCardComponent;
  let fixture: ComponentFixture<DashboardGameCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardGameCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
