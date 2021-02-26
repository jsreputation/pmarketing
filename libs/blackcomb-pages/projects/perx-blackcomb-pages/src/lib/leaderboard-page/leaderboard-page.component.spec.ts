import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderboardPageComponent } from './leaderboard-page.component';
import { ConfigModule, ConfigService, ProfileService, RankModule } from '@perxtech/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { V4RankService } from 'libs/core/projects/perx-core/src/lib/rank/v4-rank.service';
import { DefaultLangChangeEvent, LangChangeEvent, TranslateModule, TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material';
import { EventEmitter } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

describe('LeaderboardPageComponent', () => {
  let component: LeaderboardPageComponent;
  let fixture: ComponentFixture<LeaderboardPageComponent>;

  const profileServiceStub: Partial<ProfileService> = {
    whoAmI: () => of({ email: 'email@e.mail' })
  };

  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  const translateServiceStub: Partial<TranslateService> = {
    get: () => of(),
    onLangChange: new EventEmitter<LangChangeEvent>(),
    onTranslationChange: new EventEmitter<TranslationChangeEvent>(),
    onDefaultLangChange: new EventEmitter<DefaultLangChangeEvent>()
  };

  const activatedRouteStub = {
    snapshot: {
      paramMap: {
        get(): number {
          return 1;
        },
        has(): boolean {
          return true;
        }
      }
    }
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeaderboardPageComponent],
      imports: [
        RankModule,
        HttpClientTestingModule,
        ConfigModule,
        MatTabsModule,
        TranslateModule.forRoot(),
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: ProfileService,
          useValue: profileServiceStub
        },
        {
          provide: V4RankService,
          useValue: { getLeaderBoards: of(), getLeaderBoardRanks: of() }
        },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
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
