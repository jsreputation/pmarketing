import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RewardDetailPageComponent} from './reward-detail-page.component';

describe('RewardDetailPageComponent', () => {
  let component: RewardDetailPageComponent;
  let fixture: ComponentFixture<RewardDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardDetailPageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
