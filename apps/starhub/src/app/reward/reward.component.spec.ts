import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardComponent } from './reward.component';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { RewardsService } from '@perx/core';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;
  const rewardsServiceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardComponent],
      imports: [
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
