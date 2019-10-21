import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationShortFormatComponent } from './location-short-format.component';
import { LocationsService, GeoLocationService, ILocation } from '@perx/core';
import { of } from 'rxjs';
import { Type } from '@angular/core';

describe('LocationShortFormatComponent', () => {
  let component: LocationShortFormatComponent;
  let fixture: ComponentFixture<LocationShortFormatComponent>;
  const position = {
    coords: {
      accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: 0,
      longitude: 0,
      speed: null
    },
    timestamp: Date.now()
  };

  const locationServiceStub = {
    getFromMerchant: () => of()
  };
  const geoLocationServiceStub = {
    positions: () => of(position)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationShortFormatComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: LocationsService, useValue: locationServiceStub },
        { provide: GeoLocationService, useValue: geoLocationServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationShortFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('', fakeAsync(() => {
    const location = [
      {
        merchantId: 1,
        merchantName: 'abc',
        locationId: 1,
        name: 'abc',
        tags: [],
        address: '',
        address2: '',
        address3: '',
        latitude: 1,
        longitude: 2,
        phone: '',
        distance: 1,
      }
    ];

    const locationsService: LocationsService = fixture.debugElement.injector.get<LocationsService>
      (LocationsService as Type<LocationsService>);
    const locationsServiceSpy = spyOn(locationsService, 'getFromMerchant').and.returnValue(of(
      location
    ));
    component.merchantId = 1;
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    component.locations$.subscribe((res: ILocation[]) => {
      expect(res[0].merchantId).toBe(1);
      expect(res[0].merchantName).toBe('abc');
      expect(res[0].locationId).toBe(1);
      expect(res[0].name).toBe('abc');
      expect(res[0].latitude).toBe(1);
      expect(res[0].longitude).toBe(2);
    });

    component.displayLocation$.subscribe((res: ILocation) => {
      expect(res.merchantId).toBe(1);
      expect(res.merchantName).toBe('abc');
      expect(res.locationId).toBe(1);
      expect(res.name).toBe('abc');
      expect(res.latitude).toBe(1);
      expect(res.longitude).toBe(2);
    });
    expect(locationsServiceSpy).toHaveBeenCalled();
  }));
});
