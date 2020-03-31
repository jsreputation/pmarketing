import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { of } from 'rxjs';

import {
  RewardsModule,
  RewardsService,
  ThemesService,
} from '@perxtech/core';

import { RewardsListComponent } from './rewards-list.component';

describe('RewardsListComponent', () => {
  let component: RewardsListComponent;
  let fixture: ComponentFixture<RewardsListComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  beforeEach(async(() => {
    const rewardsServiceStub: Partial<RewardsService> = {
      getAllRewards: () => (of([]))
    };
    TestBed.configureTestingModule({
      imports: [RewardsModule],
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
