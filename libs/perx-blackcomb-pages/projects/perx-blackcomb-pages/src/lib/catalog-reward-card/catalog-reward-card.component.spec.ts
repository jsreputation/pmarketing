import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogRewardCardComponent } from './catalog-reward-card.component';
import {MatCardModule} from '@angular/material';

describe('CategoryRewardCardComponent', () => {
  let component: CatalogRewardCardComponent;
  let fixture: ComponentFixture<CatalogRewardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogRewardCardComponent ],
      imports: [ MatCardModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogRewardCardComponent);
    component = fixture.componentInstance;
    component.reward =  {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
