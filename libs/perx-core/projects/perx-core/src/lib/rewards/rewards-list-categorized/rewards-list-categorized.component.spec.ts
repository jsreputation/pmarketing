import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsListCategorizedComponent } from './rewards-list-categorized.component';

describe('RewardsListCategorizedComponent', () => {
  let component: RewardsListCategorizedComponent;
  let fixture: ComponentFixture<RewardsListCategorizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsListCategorizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsListCategorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
