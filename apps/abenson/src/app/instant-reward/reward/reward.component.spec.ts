import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import {
  GameModule,
  RewardsModule,
  RewardsService,
  ThemesService,
} from '@perx/core';

import { RewardComponent } from './reward.component';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  const rewardsServiceStub: Partial<RewardsService> = {
    getAllRewards: () => of(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardComponent],
      imports: [
        RouterTestingModule,
        GameModule,
        MatDialogModule,
        RewardsModule,
      ],
      providers: [
        {
          provide: RewardsService,
          useValue: rewardsServiceStub,
        },
        {
          provide: MatDialogRef,
          useValue: {}
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
    fixture = TestBed.createComponent(RewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
