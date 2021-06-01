import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { RewardsModule, RewardsService, SettingsService, ThemesService, } from '@perxtech/core';

import { RewardsListComponent } from './rewards-list.component';

describe('RewardsListComponent', () => {
  let component: RewardsListComponent;
  let fixture: ComponentFixture<RewardsListComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };
  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
  };

  beforeEach(async(() => {
    const rewardsServiceStub: Partial<RewardsService> = {
      getAllRewards: () => (of([]))
    };
    TestBed.configureTestingModule({
      imports: [RewardsModule, TranslateModule.forRoot()],
      declarations: [RewardsListComponent],
      providers: [
        {
          provide: RewardsService,
          useValue: rewardsServiceStub
        },
        {
          provide: ThemesService,
          useValue: themesServiceStub,
        },
        { provide: SettingsService, useValue: settingsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsListComponent);
    component = fixture.componentInstance;
    // rewardsService = TestBed.get<RewardsService>(RewardsService as Type<RewardsService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
