import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderboardsComponent } from './leaderboards.component';
import { ConfigModule, IRankService, RankModule } from '@perxtech/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LeaderboardsComponent', () => {
  let component: LeaderboardsComponent;
  let fixture: ComponentFixture<LeaderboardsComponent>;

  const rankServiceStub: Partial<IRankService> = {
    getLeaderBoards: () => of()
  };

  const router = {
    navigate: jest.fn()
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
        { provide: Router, useValue: router }
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
