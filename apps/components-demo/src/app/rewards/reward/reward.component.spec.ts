import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardComponent } from './reward.component';
import {
  RewardsModule,
  RewardsService,
  IReward
} from '@perx/core';
import { MatButtonModule } from '@angular/material';
import { of, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RewardsModule.forRoot({ env: environment }),
        MatButtonModule,
        HttpClientTestingModule
      ],
      declarations: [RewardComponent],
      // providers: [{
      //   provide: RewardsService,
      //   useValue: {
      //     getReward: (id: number): Observable<IReward> => of({
      //       id: 1,
      //       name: 'Guru naru $5',
      //       subtitle: 'So yummy',
      //       description: 'Better than anything',
      //       validFrom: null,
      //       validTo: null,
      //       rewardThumbnail: 'https://picsum.photos/600/300?random=2',
      //       rewardBanner: 'https://picsum.photos/200/300?random=2',
      //       merchantImg: 'https://picsum.photos/200/300?random=2',
      //       termsAndConditions: '',
      //       howToRedeem: ''
      //     })
      //   }
      // }]
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
