import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRewardsComponent } from './favorite-rewards.component';
import { RewardsListComponent, TokenStorage, UtilsModule, ThemesService, RewardsService } from '@perxtech/core';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

describe('FavoriteRewardsComponent', () => {
  let component: FavoriteRewardsComponent;
  let fixture: ComponentFixture<FavoriteRewardsComponent>;
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };
  const tokenStorageStub: Partial<TokenStorage> = {
    getAppInfoProperty: () => undefined,
    setAppInfoProperty: () => { }
  };

  const rewardsServiceStub: Partial<RewardsService> = {
    getReward: () => of(),
    getAllFavoriteRewards: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FavoriteRewardsComponent,
        RewardsListComponent
      ],
      imports: [
        MatCardModule,
        UtilsModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: TokenStorage, useValue: tokenStorageStub
        },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: ThemesService, useValue: themesServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
