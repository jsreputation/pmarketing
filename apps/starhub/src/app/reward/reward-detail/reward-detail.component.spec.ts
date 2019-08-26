import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardDetailComponent } from './reward-detail.component';
import { MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { RewardsService } from '@perx/core';
import { LocationShortFormatComponent } from '../../location-short-format/location-short-format.component';

describe('RewardDetailComponent', () => {
  let component: RewardDetailComponent;
  let fixture: ComponentFixture<RewardDetailComponent>;
  const rewardsServiceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardDetailComponent, LocationShortFormatComponent ],
      imports: [
        MatIconModule,
        RouterTestingModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
