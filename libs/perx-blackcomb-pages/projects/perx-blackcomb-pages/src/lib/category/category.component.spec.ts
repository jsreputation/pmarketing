import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {MatCardModule} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {RewardsService} from '../../../../../../perx-core/dist/perx-core';
import {of} from 'rxjs';
import {CategoryRewardCardComponent} from '../category-reward-card/category-reward-card.component';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  const routerStub = { navigateByUrl: () => ({}) };
  const rewardsServiceStub = {
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
      declarations: [ CategoryComponent, CategoryRewardCardComponent ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
      imports: [
        InfiniteScrollModule,
        MatCardModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
