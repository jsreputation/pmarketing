import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyCustomerComponent } from './identify-customer.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IMerchantAdminService, ThemesService } from '@perxtech/core';
import { MerchantQrscannerModule } from '@perxtech/bcm-pages';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

describe('IdentifyCustomerComponent', () => {
  let component: IdentifyCustomerComponent;
  let fixture: ComponentFixture<IdentifyCustomerComponent>;
  const routerStub = { navigate: () => ({}) };
  let params: Subject<Params>;
  const merchantAdminServiceStub: Partial<IMerchantAdminService> = {
    getCustomerDetails: () => of()
  };
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  beforeEach(async () => {
    params = new Subject<Params>();
    await TestBed.configureTestingModule({
      declarations: [ IdentifyCustomerComponent, HeaderComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MerchantQrscannerModule,
        MatIconModule,
        MatSelectModule,
        TranslateModule.forRoot()],
      providers: [
        { provide: ActivatedRoute, useValue: {params} },
        { provide: Router, useValue: routerStub },
        { provide: IMerchantAdminService, useValue: merchantAdminServiceStub },
        { provide: ThemesService, useValue: themesServiceStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifyCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
