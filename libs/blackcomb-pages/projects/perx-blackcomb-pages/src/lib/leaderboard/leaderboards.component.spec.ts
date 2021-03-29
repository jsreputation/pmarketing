import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderboardsComponent } from './leaderboards.component';
import { ConfigModule, IRankService, RankModule } from '@perxtech/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

describe('LeaderboardsComponent', () => {
  let component: LeaderboardsComponent;
  let fixture: ComponentFixture<LeaderboardsComponent>;

  const rankServiceStub: Partial<IRankService> = {
    getLeaderBoards: () => of(),
    getLeaderBoardsByCampaignID: () => of()
  };

  const router = {
    navigate: jest.fn()
  };

  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get(): number {
          return 1;
        }
      }
    }
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
        { provide: IRankService, useValue: rankServiceStub },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
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
