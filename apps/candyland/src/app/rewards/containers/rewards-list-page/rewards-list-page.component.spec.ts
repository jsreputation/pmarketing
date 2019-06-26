import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsListPageComponent } from './rewards-list-page.component';

describe('RewardsListPageComponent', () => {
  let component: RewardsListPageComponent;
  let fixture: ComponentFixture<RewardsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardsListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
