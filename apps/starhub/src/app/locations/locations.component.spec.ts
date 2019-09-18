import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsComponent } from './locations.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilsModule, RewardsService, IMerchantsService } from '@perx/core';
import { of } from 'rxjs';

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;
  const rewardsServiceStub = {};
  const merchantsServiceStub = {
    getMerchant: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsComponent],
      imports: [
        MatIconModule,
        MatToolbarModule,
        RouterTestingModule,
        UtilsModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        {
          provide: IMerchantsService, useValue: merchantsServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
