import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { of } from 'rxjs';

import {
  RewardsModule as PerxRewardsModule,
  ThemesService,
} from '@perx/core';
import { RewardsService } from '@perx/core';

import { RewardsCollectionComponent } from './rewards-collection.component';

describe('RewardsCollectionComponent', () => {
  let component: RewardsCollectionComponent;
  let fixture: ComponentFixture<RewardsCollectionComponent>;

  const rewardsServiceStub = {
    getAllRewards: () => of([])
  };
  const themesServiceStub = {
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
