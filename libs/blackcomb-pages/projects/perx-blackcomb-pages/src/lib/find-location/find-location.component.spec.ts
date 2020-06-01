import { TranslateModule } from '@ngx-translate/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLocationComponent } from './find-location.component';
import { LocationsService, IMerchantsService, LocationModule } from '@perxtech/core';
import { of } from 'rxjs';
import { MatTabsModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FindLocationComponent', () => {
  let component: FindLocationComponent;
  let fixture: ComponentFixture<FindLocationComponent>;
  const locationServiceStub: Partial<LocationsService> = {
    getAllLocations: () => of(),
    getTags: () => of()
  };

  const merchantsServiceStub: Partial<IMerchantsService> = {
    getAllMerchants: () => of(),
    getMerchant: () => of({ name: 'merchant-name', id: 1 })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FindLocationComponent],
      imports: [
        LocationModule,
        MatTabsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: LocationsService, useValue: locationServiceStub },
        { provide: IMerchantsService, useValue: merchantsServiceStub }
      ]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(FindLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
