import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsCollectionComponent } from './rewards-collection.component';
import { RewardsModule as PerxRewardsModule } from '@perx/core';
import { environment } from '../../../environments/environment';
import { RewardsService } from '@perx/core';
import { of } from 'rxjs';

describe('RewardsCollectionComponent', () => {
  let component: RewardsCollectionComponent;
  let fixture: ComponentFixture<RewardsCollectionComponent>;
  const rewardsServiceStub = {
    getAllRewards: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsCollectionComponent],
      imports: [
        PerxRewardsModule.forRoot({ env: environment }),
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub }
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
