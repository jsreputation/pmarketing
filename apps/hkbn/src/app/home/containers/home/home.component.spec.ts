import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { LoyaltyModule, LoyaltyService, ProfileService, RewardsModule } from '@perx/core/dist/perx-core';
import { MatButtonModule } from '@angular/material';
import { QRCodeModule } from 'angularx-qrcode';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LoyaltyModule,
        QRCodeModule,
        MatButtonModule,
        RewardsModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [
        {provide: ProfileService, useValue: {whoAmI: () => of(null)}},
        {provide: LoyaltyService, useValue: {getLoyalties: () => of(null)}}
      ],
      declarations: [HomeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
