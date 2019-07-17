import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsListTabbedComponent } from './rewards-list-tabbed.component';

describe('RewardsListTabbedComponent', () => {
  let component: RewardsListTabbedComponent;
  let fixture: ComponentFixture<RewardsListTabbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsListTabbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsListTabbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
