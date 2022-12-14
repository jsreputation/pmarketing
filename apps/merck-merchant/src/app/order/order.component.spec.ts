import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { HeaderComponent } from '../header/header.component';
import { OrderQuantityComponent } from '../order/order-quantity/order-quantity.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { from, of } from 'rxjs';
import { Type } from '@angular/core';
import { IMerchantAdminService, NotificationService, ThemesService, TokenStorage } from '@perxtech/core';
import { Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  history.pushState({ data: '{"id": 1234, "name": "John", "rewardId": 149}' }, '', '');
  const locationStub: Partial<Location> = {
    back: () => {
    }
  };
  const tokenStorageStub = {
    getAppInfoProperty: () => { }
  };
  const routerStub = {
    navigate: () => ({}),
    getCurrentNavigation: () => (
      {
        extras: {
          state: {
            data: '{"name": "name", "id": "0"}'
          }
        }
      }
    )
  };
  const transaction = {
    amount: 5,
    createdAt: new Date('2019-10-04T17:50:48.102Z'),
    currency: 'points',
    id: 36,
    properties: null,
    transactionDate: new Date('2019-10-04T17:50:48.092Z'),
    transactionReference: 'generatedRef',
    transactionType: 'Glucophage XR Tab',
    updatedAt: new Date('2019-10-04T17:50:48.102Z'),
    userAccountId: 1,
    workflowId: null,
  };

  const merchantAdminServiceStub: Partial<IMerchantAdminService> = {
    createTransaction: () => of(transaction),
    getMerchantProfile: () => of()
  };

  const products = [
    {
      name: 'Glucophage XR Tab',
      description: '1000mg 60\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
      price: 100,
      currency: 'HKD',
    },
    {
      name: 'Glucophage XR Tab',
      description: '500mg 60\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
      price: 50,
      currency: 'HKD'
    },
    {
      name: 'Glucophage XR Tab',
      description: '750mg 30\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
      price: 75,
      currency: 'HKD'
    },
    {
      name: 'Glucovance Tab',
      description: '2.5mg 30\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
      price: 50,
      currency: 'HKD'
    },
    {
      name: 'Glucovance Tab',
      description: '5mg 30\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
      price: 100,
      currency: 'HKD'
    },
    {
      name: 'Concor Tab',
      description: '2.5mg 30\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
      price: 50,
      currency: 'HKD'
    },
    {
      name: 'Concor Tab',
      description: '5mg 100\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
      price: 100,
      currency: 'HKD'
    }
  ];
  const productServiceStub: Partial<ProductService> = {
    getProducts: () => of(products)
  };
  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderComponent,
        HeaderComponent,
        OrderQuantityComponent
      ],
      imports: [
        MatIconModule,
        MatToolbarModule,
        FormsModule,
        MatListModule,
        MatDividerModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ProductService, useValue: productServiceStub },
        { provide: Location, useValue: locationStub },
        { provide: IMerchantAdminService, useValue: merchantAdminServiceStub },
        {
          provide: NotificationService, useValue: {
            addSnack: () => {
            }
          }
        },
        { provide: TokenStorage, useValue: tokenStorageStub },
        { provide: ThemesService, useValue: themesServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should save scanned qrcode to payload', () => {
      component.ngOnInit();
      expect(component.payload).toEqual({ id: 1234, name: 'John', rewardId: 149 });
    });

    it('should get products', () => {
      const productService: ProductService = fixture.debugElement.injector.get<ProductService>(ProductService as Type<ProductService>);
      const productsStub = [{
        name: 'Glucophage XR Tab',
        description: '1000mg 60\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
        price: 100,
        currency: 'HKD'
      }, {
        name: 'Glucophage XR Tab',
        description: '500mg 60\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
        price: 50,
        currency: 'HKD'
      }];
      const productServiceSpy = spyOn(productService, 'getProducts').and.returnValue(of(productsStub));
      component.ngOnInit();
      expect(productServiceSpy).toHaveBeenCalled();
      expect(component.rewards).toBe(productsStub);
    });
  });

  it('should update product quantity to 5', () => {
    component.newQuantity({ qty: 5, index: 0 });
    expect(component.rewards[0].quantity).toBe(5);
  });

  it('should toggleSummary', () => {
    component.toggleSummary();
    expect(component.isSummaryActivated).toBe(true);
  });

  it('should update the payload based on the data passed', () => {
    const qty = 2;
    const index = 0;
    component.newQuantity({ qty, index });
    expect(component.rewards[index].quantity).toBe(2);
  });

  it('should navigate to home onCancel click', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigate').and.callThrough();
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should addSnack and navigate to home onCompleteTransaction', async((done) => {
    const merchantAdminService: IMerchantAdminService = fixture.debugElement.injector.get<IMerchantAdminService>(
      IMerchantAdminService as Type<IMerchantAdminService>);
    const merchantAdminServiceSpy = spyOn(merchantAdminService, 'createTransaction')
      .and.returnValue(
        of(transaction)
      );
    const notificationService: NotificationService = fixture.debugElement.injector.get
    <NotificationService>(NotificationService as Type<NotificationService>);
    const notificationSpy = spyOn(notificationService, 'addSnack');

    const router: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(router, 'navigate').and.callThrough();

    component.onCompleteTransaction();
    from(component.selectedProducts).subscribe(() => {
      expect(merchantAdminServiceSpy).toHaveBeenCalled();
      expect(notificationSpy).toHaveBeenCalledWith('Transaction completed');
      expect(routerSpy).toHaveBeenCalledWith(['/home']);
      done();
    });
  }));

});
