import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardAboutComponent } from './leaderboard-about.component';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { LoyaltyService, RewardsService, SafeHtmlPipe } from '@perxtech/core';
import { RouterModule } from '@angular/router';

describe('LeaderboardAboutComponent', () => {
  let component: LeaderboardAboutComponent;
  let fixture: ComponentFixture<LeaderboardAboutComponent>;
  const rewardsServiceStub: Partial<RewardsService> = {
    getAllRewards: () => of([]),
    getRewards: () => of([]),
    getCategories: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardAboutComponent, SafeHtmlPipe],
      imports: [MatDividerModule, RouterModule],
      providers: [{
        provide: TranslateService,
        useValue: {
          get: () => of()
        }
      },
      { provide: RewardsService, useValue: rewardsServiceStub },
      {
        provide: LoyaltyService,
        useValue: {
          getLoyalty: () => of()
        }
      }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
