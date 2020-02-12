import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsComponent } from './catalogs.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { MatCardModule } from '@angular/material';
import {IReward, RewardsService} from '@perx/core';
import {of} from 'rxjs';

describe('CatalogsComponent', () => {
  let component: CatalogsComponent;
  let fixture: ComponentFixture<CatalogsComponent>;

  const mockReward: IReward = {
    id: 1,
    name: '',
    description: '',
    subtitle: '',
    validFrom: new Date(),
    validTo: new Date(),
    rewardBanner: '',
    merchantImg: '',
    termsAndConditions: '',
    howToRedeem: '',
  };

  const rewardsServiceStub = {
    getReward: () => of(mockReward),
    getCatalogs: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsComponent ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub }
      ],
      imports: [
        InfiniteScrollModule,
        MatCardModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
