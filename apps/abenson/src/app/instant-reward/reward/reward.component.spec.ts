import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import {
  GameModule,
  RewardsModule,
  RewardsService,
  ThemesService,
} from '@perxtech/core';
import { RewardComponent } from './reward.component';
import { TokenStorage } from '@perxtech/core';

describe('RewardComponent', () => {
  let component: RewardComponent;
  let fixture: ComponentFixture<RewardComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  const rewardsServiceStub: Partial<RewardsService> = {
    getAllRewards: () => of(),
  };

  const tokenStorageStub = {
    getAppInfoProperty: () => null,
    setAppInfoProperty: () => { }
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
        {
          provide: TokenStorage,
          useValue: tokenStorageStub
        }
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
