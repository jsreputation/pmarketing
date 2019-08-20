import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardDetailComponent } from './reward-detail.component';
import { DetailHeaderModule } from '../detail-header/detail-header.module';
import { RewardsModule, ProfileModule, LoyaltyModule, VouchersModule } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RewardDetailComponent', () => {
  let component: RewardDetailComponent;
  let fixture: ComponentFixture<RewardDetailComponent>;
  let debugElement: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardDetailComponent],
      imports: [
        DetailHeaderModule,
        RewardsModule.forRoot({ env: environment }),
        ProfileModule.forRoot({ env: environment }),
        LoyaltyModule.forRoot({ env: environment }),
        VouchersModule.forRoot({ env: environment }),
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the disabled button', () => {
    component.pointsBalance = { insufficientPoints: 100 };
    fixture.detectChanges();
    const button = debugElement.query(By.css('.redeem-container button')).nativeElement;
    expect(button.disabled).toBeTruthy();
  });
});
