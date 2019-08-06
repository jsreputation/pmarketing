import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsListFilteredComponent } from './rewards-list-filtered.component';

describe('RewardsListFilteredComponent', () => {
  let component: RewardsListFilteredComponent;
  let fixture: ComponentFixture<RewardsListFilteredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsListFilteredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsListFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
