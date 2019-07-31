import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsListComponent } from './rewards-list.component';
import { RewardsModule, RewardsService } from '@perx/core';

describe('RewardsListComponent', () => {
  let component: RewardsListComponent;
  let fixture: ComponentFixture<RewardsListComponent>;
  let rewardsService: RewardsService;

  beforeEach(async(() => {
    const rewardsServiceStub = {
      getAllRewards: () => ({ subscribe: () => ({}) })
    };
    TestBed.configureTestingModule({
      imports: [RewardsModule],
      declarations: [RewardsListComponent],
      providers: [
        {
          provide: RewardsService,
          useValue: rewardsServiceStub
        },
      ]
      // providers: [ RewardsService ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsListComponent);
    component = fixture.componentInstance;
    rewardsService = TestBed.get(RewardsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
