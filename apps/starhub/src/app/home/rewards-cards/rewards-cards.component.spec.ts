import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsCardsComponent } from './rewards-cards.component';
import { MatIconModule, MatCardModule } from '@angular/material';
import { RewardsService } from '@perx/core';
import { of } from 'rxjs';
import { rewards } from 'src/app/rewards.mock';

describe('RewardsCardsComponent', () => {
  let component: RewardsCardsComponent;
  let fixture: ComponentFixture<RewardsCardsComponent>;
  const rewardsServiceStub = {
    getAllRewards: () => of(rewards)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsCardsComponent],
      imports: [
        MatIconModule,
        MatCardModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getMacaron', () => {
    it('should return expiring', () => {
      const currentTime = new Date();
      const validDateTo = new Date(currentTime.setDate(currentTime.getDate() + 1)); // set to 24hrs
      const macaronText = component.getMacaron(String(validDateTo));
      expect(macaronText).toBe('expiring');
    });

    it('should return empty string', () => {
      const currentTime = new Date();
      const validDateTo = new Date(currentTime.setDate(currentTime.getDate() + 2)); // set to 48hrs
      const macaronText = component.getMacaron(String(validDateTo));
      expect(macaronText).toBe('');
    });
  });
});
