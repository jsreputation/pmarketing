import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FindPharmacyComponent } from './find-pharmacy.component';
import { LocationModule, LocationsService, IMerchantsService } from '@perx/core';
import { MatTabsModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

const iMerchantsServiceStub = {
  getMerchant: () => of(null)
};

describe('FindPharmacyComponent', () => {
  let component: FindPharmacyComponent;
  let fixture: ComponentFixture<FindPharmacyComponent>;

  const locationServiceStub = {
    getAllLocations: () => of(),
    getTags: () => of()
  };

  const locationsStub = [
    {
      merchantId: 1,
      locationId: 1,
      name: 'Pharmacy Name',
      tags: ['Drug', 'Medical Supply'],
      address: 'Pharmacy Address',
      latitude: 15.470044,
      longitude: 120.955672,
      phone: '+852 3102 4028'
    },
    {
      merchantId: 1,
      locationId: 1,
      name: 'Pharmacy Name',
      tags: ['Drug'],
      address: 'Pharmacy Address',
      latitude: 15.459698,
      longitude: 120.950294,
      phone: '+852 3102 4028'
    }
  ];
  const tagsStub = ['Drug', 'Medical Supply'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FindPharmacyComponent],
      imports: [
        LocationModule,
        MatTabsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: LocationsService, useValue: locationServiceStub },
        { provide: IMerchantsService, useValue: iMerchantsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should get all locations', fakeAsync(() => {
      const locationsService: LocationsService = fixture.debugElement.injector.get<LocationsService>
        (LocationsService as Type<LocationsService>);
      const locationsServiceSpy = spyOn(locationsService, 'getAllLocations').and.returnValue(of(locationsStub));
      component.ngOnInit();
      tick();
      fixture.detectChanges();
      expect(locationsServiceSpy).toHaveBeenCalled();
      locationsService.getAllLocations().subscribe(res => {
        expect(res).toEqual(locationsStub);
      });
    }));

    it('should get all tags', fakeAsync(() => {
      const locationsTags: LocationsService = fixture.debugElement.injector.get<LocationsService>
        (LocationsService as Type<LocationsService>);
      const locationsTagsSpy = spyOn(locationsTags, 'getTags').and.returnValue(of(tagsStub));
      component.ngOnInit();
      tick();
      fixture.detectChanges();
      expect(locationsTagsSpy).toHaveBeenCalled();
      expect(component.tags).toEqual([{ name: 'Drug', isSelected: false }, { name: 'Medical Supply', isSelected: false }]);
    }));
  });
});
