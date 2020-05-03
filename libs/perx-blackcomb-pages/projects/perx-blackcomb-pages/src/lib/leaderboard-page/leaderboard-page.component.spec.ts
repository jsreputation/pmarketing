import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardPageComponent } from './leaderboard-page.component';
import {ConfigModule, ConfigService, ProfileService, RankModule} from '@perxtech/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {of} from 'rxjs';

describe('LeaderboardPageComponent', () => {
  let component: LeaderboardPageComponent;
  let fixture: ComponentFixture<LeaderboardPageComponent>;

  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of({ email: 'email@e.mail' })
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardPageComponent ],
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
        {
          provide: ProfileService,
          useValue: profileServiceStub
        },
        { provide: ConfigService, useValue: configServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
