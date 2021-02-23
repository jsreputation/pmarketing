import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardsComponent } from './leaderboards.component';
import { ConfigModule, IRankService, ProfileService, RankModule } from '@perxtech/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { V4RankService } from 'libs/core/projects/perx-core/src/lib/rank/v4-rank.service';

describe('LeaderboardsComponent', () => {
  let component: LeaderboardsComponent;
  let fixture: ComponentFixture<LeaderboardsComponent>;

  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of({ email: 'email@e.mail' })
  };

  const rankServiceStub: Partial<V4RankService> = {
    getLeaderBoards: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardsComponent],
      imports: [
        RankModule,
        HttpClientTestingModule,
        ConfigModule
      ],
      providers: [
        {
          provide: ProfileService,
          useValue: profileServiceStub
        },
        { provide: IRankService, useValue: rankServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
