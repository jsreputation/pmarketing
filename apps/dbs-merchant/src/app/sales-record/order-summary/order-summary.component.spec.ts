import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSummaryComponent } from './order-summary.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router} from '@angular/router';
import { IMerchantAdminService, NotificationService } from '@perxtech/core';

describe('OrderSummaryComponent', () => {
  let component: OrderSummaryComponent;
  let fixture: ComponentFixture<OrderSummaryComponent>;
  const routerStub = { navigate: () => ({}) };
  const merchantAdminServiceStub: Partial<IMerchantAdminService> = {
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule
      ],
      declarations: [ OrderSummaryComponent ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: IMerchantAdminService, useValue: merchantAdminServiceStub },
        { provide: NotificationService, useValue: {
          addSnack : () => {} }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
