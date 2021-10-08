import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReserveOrderItemsComponent } from './reserve-order-items.component';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IMerchantAdminService, NotificationService } from '@perxtech/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

describe('OrderComponent', () => {
  let component: ReserveOrderItemsComponent;
  let fixture: ComponentFixture<ReserveOrderItemsComponent>;
  history.pushState({ data: '{"id": 1234, "name": "John", "rewardId": 149}' }, '', '');
  const routerStub = { navigate: () => ({}),
  getCurrentNavigation: () => (
    {
      extras: {
        state: {
          data: '{"name": "name", "id": "0"}'
        }
      }
    }) };
  const merchantAdminServiceStub: Partial<IMerchantAdminService> = {
    getCustomerLoyalties: () => of()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ ReserveOrderItemsComponent ],
      providers : [
        { provide: Router , useValue: routerStub },
        { provide: IMerchantAdminService, useValue: merchantAdminServiceStub },
        { provide: NotificationService, useValue: {
          addSnack : () => {},
          addPopup: () => {} }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
