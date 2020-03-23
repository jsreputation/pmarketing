import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { of } from 'rxjs';

import {
  RewardsModule as PerxRewardsModule,
  ThemesService,
} from '@perxtech/core';
import { RewardsService } from '@perxtech/core';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsCollectionComponent],
      imports: [
        PerxRewardsModule,
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
