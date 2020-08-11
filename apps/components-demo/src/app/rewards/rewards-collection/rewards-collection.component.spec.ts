import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { of } from 'rxjs';

import {
  RewardsModule as PerxRewardsModule,
  ThemesService, TokenStorage
} from '@perxtech/core';
import { RewardsService } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { RewardsCollectionComponent } from './rewards-collection.component';

describe('RewardsCollectionComponent', () => {
  let component: RewardsCollectionComponent;
  let fixture: ComponentFixture<RewardsCollectionComponent>;

  const rewardsServiceStub: Partial<RewardsService> = {
    getAllRewards: () => of([])
  };
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };
  const tokenStorageStub = {
    getAppInfoProperty: () => null,
    setAppInfoProperty: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsCollectionComponent],
      imports: [
        PerxRewardsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: RewardsService,
          useValue: rewardsServiceStub,
        },
        {
          provide: ThemesService,
          useValue: themesServiceStub,
        },
        {
          provide: TokenStorage,
          useValue: tokenStorageStub,
        },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
