import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRewardCardComponent } from './category-reward-card.component';
import {MatCardModule} from '@angular/material';

describe('CategoryRewardCardComponent', () => {
  let component: CategoryRewardCardComponent;
  let fixture: ComponentFixture<CategoryRewardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryRewardCardComponent ],
      imports: [ MatCardModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryRewardCardComponent);
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
