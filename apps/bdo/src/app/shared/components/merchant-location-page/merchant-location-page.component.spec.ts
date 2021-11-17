import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { IVoucherService, LocationsService } from '@perxtech/core';
import { of } from 'rxjs';
import { MerchantLocationPageComponent } from './merchant-location-page.component';

class v4VouchersService {
  getRewardLocations(id) {
    return of(id);
  }
}

const locationServiceStub: Partial<LocationsService> = {
  getCampaigns: () => of()
}

describe('DealLocationPageComponent', () => {
  let component: MerchantLocationPageComponent;
  let fixture: ComponentFixture<MerchantLocationPageComponent>;
  const routerBdo: Partial<Router> = {
    navigate: () => Promise.resolve(true)
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MerchantLocationPageComponent],
      imports: [],
      providers: [
        { provide: IVoucherService, useClass: v4VouchersService },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{ rid: 123 }]),
          },
        },
        { provide: Router, useValue: routerBdo },
        { provide: LocationsService, useValue: locationServiceStub}
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantLocationPageComponent);
    component = fixture.componentInstance;
    component.location = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
