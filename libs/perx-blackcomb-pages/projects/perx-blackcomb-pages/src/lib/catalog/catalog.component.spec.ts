import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatCardModule, MatIconModule, MatMenuModule} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {RewardsService, SortRewardsPipe} from '@perx/core';
import {of} from 'rxjs';
import {CatalogComponent} from './catalog.component';
import {CatalogRewardCardComponent} from '../catalog-reward-card/catalog-reward-card.component';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  const routerStub: Partial<Router> = { navigateByUrl: () => new Promise<boolean>(resolve => resolve(true)) };
  const rewardsServiceStub: Partial<RewardsService> = {
    getRewards: () => of()
  };
  const activatedRouteStub = {
    snapshot: {
      params: {
        id: 42
      },
      queryParamMap: {
        get: () => of ()
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CatalogComponent,
        CatalogRewardCardComponent,
        SortRewardsPipe
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
      imports: [
        InfiniteScrollModule,
        MatIconModule,
        MatMenuModule,
        MatCardModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
