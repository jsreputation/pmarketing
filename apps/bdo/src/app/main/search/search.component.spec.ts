import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { of } from 'rxjs';
import { RewardsService } from '@perxtech/core';
import { Router } from '@angular/router';
import { rewards } from './../../../../../starhub/src/app/rewards.mock';

describe('SearchComponent', () => {

  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  const rewardsServiceBdo: Partial<RewardsService> = {
    getRewards: () => of(rewards),
    getTrending: () => of([])
  };

  const routerBdo: Partial<Router> = {
    navigate: () => Promise.resolve(true)
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers:
      [
        { provide: RewardsService, useValue: rewardsServiceBdo},
        { provide: Router, useValue:routerBdo}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
