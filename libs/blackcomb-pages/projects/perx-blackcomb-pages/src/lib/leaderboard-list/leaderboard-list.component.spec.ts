import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardListComponent } from './leaderboard-list.component';
import {ConfigModule, ConfigService, ProfileService, RankModule} from '@perxtech/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {of} from 'rxjs';

describe('LeaderboardListComponent', () => {
  let component: LeaderboardListComponent;
  let fixture: ComponentFixture<LeaderboardListComponent>;

  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of({ email: 'email@e.mail' })
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardListComponent ],
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
        { provide: ConfigService, useValue: configServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
