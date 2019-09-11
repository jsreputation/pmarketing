import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltySummaryComponent } from './loyalty-summary.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileModule } from '../../profile/profile.module';
import { LoyaltyModule } from '../loyalty.module';
import { ConfigModule } from '../../config/config.module';

describe('LoyaltySummaryComponent', () => {
  let component: LoyaltySummaryComponent;
  let fixture: ComponentFixture<LoyaltySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ProfileModule,
        LoyaltyModule,
        ConfigModule.forRoot({})
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
