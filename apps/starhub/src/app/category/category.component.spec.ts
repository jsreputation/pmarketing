import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatToolbarModule, MatCardModule, MatBottomSheetModule } from '@angular/material';
import { RewardsService } from '@perx/core';
import { of } from 'rxjs';
import { rewards } from '../rewards.mock';
import { catalogs } from '../catalogs.mock';
import { RewardsSortPipe } from './rewards-sort.pipe';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  const rewardsServiceStub = {
    getAllRewards: () => of(rewards),
    getCatalog: () => of(catalogs[0])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryComponent, RewardsSortPipe],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        MatBottomSheetModule,
        MatCardModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub }
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

  describe('getMacaron', () => {
    it('should return expiring', () => {
      const currentTime = new Date();
      const validTo = new Date(currentTime.setDate(currentTime.getDate() + 1)); // set to 24hrs
      const validFrom = new Date(currentTime.setDate(currentTime.getDate() + 4)); // set to 96hrs
      const macaronText = component.getMacaron(String(validFrom), String(validTo));
      expect(macaronText).toBe('expiring');
    });

    it('should return just-added', () => {
      const currentTime = new Date();
      const validTo = new Date(currentTime.setDate(currentTime.getDate() + 2)); // set to 48hrs
      const validFrom = new Date(currentTime.setDate(currentTime.getDate() + 1)); // set to 24hrs
      const macaronText = component.getMacaron(String(validFrom), String(validTo));
      expect(macaronText).toBe('just-added');
    });

    it('should return empty string', () => {
      const currentTime = new Date();
      const validTo = new Date(currentTime.setDate(currentTime.getDate() + 2)); // set to 48hrs
      const validFrom = new Date(currentTime.setDate(currentTime.getDate() + 4)); // set to 96hrs
      const macaronText = component.getMacaron(String(validFrom), String(validTo));
      expect(macaronText).toBe('');
    });
  });
});
