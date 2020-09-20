import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsLargeListComponent } from './rewards-large-list.component';

describe('RewardsLargeListComponent', () => {
  let component: RewardsLargeListComponent;
  let fixture: ComponentFixture<RewardsLargeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsLargeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsLargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
