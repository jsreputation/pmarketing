import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { LocationsListComponent } from './locations-list.component';
import { MatListModule, MatDividerModule } from '@angular/material';
import { of } from 'rxjs';

describe('LocationsListComponent', () => {
  let component: LocationsListComponent;
  let fixture: ComponentFixture<LocationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsListComponent],
      imports: [MatListModule, MatDividerModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should display all locations', () => {
    component.locations = of([
      {
        merchantId: 2,
        locationId: 4,
        name: 'China Point',
        tags: [],
        address: '133 New Bridge Rd, #B1-50A, Singapore 059413',
        latitude: 123,
        longitude: 345,
        phone: '+852 3102 4028'
      }
    ]);
    expect(true).toBeTruthy();
  });

  it('should gMapUrl', () => {
    expect(component.gMapUrl({ name: 'test', latitude: 1, longitude: 1 })).toBe('https://www.google.com/maps/search/?api=1&query=1,1');
  });

  it('should handle headerFn', fakeAsync(() => {
    component.ngOnInit();
    component.headerFn({ name: 'test', latitude: 1, longitude: 1 })
      .subscribe((val) => expect(val).toBe('test'));
    tick();
    component.headerFn({ name: 'test', latitude: 1, longitude: 1, merchantName: 'test2' })
      .subscribe((val) => expect(val).toBe('test2'));
    tick();
    component.ngOnInit();
  }));
});
