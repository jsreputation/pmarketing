import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardsComponent } from './leaderboards.component';
import {ConfigModule, ConfigService, ProfileService, RankModule} from '@perxtech/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {of} from 'rxjs';

describe('LeaderboardsComponent', () => {
  let component: LeaderboardsComponent;
  let fixture: ComponentFixture<LeaderboardsComponent>;

  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of({ email: 'email@e.mail' })
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardsComponent ],
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
    fixture = TestBed.createComponent(LeaderboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
