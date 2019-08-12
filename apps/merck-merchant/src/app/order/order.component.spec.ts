import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { HeaderComponent } from '../header/header.component';
import { OrderQuantityComponent } from '../order/order-quantity/order-quantity.component';
import { MatToolbarModule, MatListModule, MatDividerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { NotificationService } from '@perx/core';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  history.pushState({data: '{"id": 1234, "name": "John", "rewardId": 149}' }, '', '');

  const routerStub = {
    navigate: () => ({}),
    getCurrentNavigation: () =>  (
      {
        extras: {
          state: {
            data: '{"name": "name", "id": "0"}'
          }
        }
      }
    )
  };

  const products = [
    {
      name: 'Glucophage XR Tab',
      description: '1000mg 60\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
    },
    {
      name: 'Glucophage XR Tab',
      description: '500mg 60\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
    },
    {
      name: 'Glucophage XR Tab',
      description: '750mg 30\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
    },
    {
      name: 'Glucovance Tab',
      description: '2.5mg 30\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
    },
    {
      name: 'Glucovance Tab',
      description: '5mg 30\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
    },
    {
      name: 'Concor Tab',
      description: '2.5mg 30\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
    },
    {
      name: 'Concor Tab',
      description: '5mg 100\'s',
      imageUrl: 'https://picsum.photos/200',
      pointsPerUnit: 5,
    }
  ];
  const productServiceStub = {
    getProducts: () => of(products)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderComponent,
        HeaderComponent,
        OrderQuantityComponent
      ],
      imports: [ MatToolbarModule, FormsModule, MatListModule, MatDividerModule ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ProductService, useValue: productServiceStub },
        {
          provide: NotificationService, useValue: {
            addSnack: () => {}
          }
        }
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
      expect(component.payload).toEqual({id: 1234, name: 'John', rewardId: 149});
    });

    it('should get products', () => {
      const productService: ProductService = fixture.debugElement.injector.get<ProductService>(ProductService as Type<ProductService>);
      const productsStub = [{
        name: 'Glucophage XR Tab',
        description: '1000mg 60\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
      },
      {
        name: 'Glucophage XR Tab',
        description: '500mg 60\'s',
        imageUrl: 'https://picsum.photos/200',
        pointsPerUnit: 5,
      }];
      const productServiceSpy = spyOn(productService, 'getProducts').and.returnValue(of(productsStub));
      component.ngOnInit();
      expect(productServiceSpy).toHaveBeenCalled();
      expect(component.rewards).toBe(productsStub);
    });
  });

  it('should update product quantity to 5', () => {
    component.newQuantity({qty: 5, index: 0});
    expect (component.rewards[0].quantity).toBe(5);
  });

  it('should toggleSummary', () => {
    component.toggleSummary();
    expect(component.isSummaryActivated).toBe(true);
  });

  it('should update the payload based on the data passed', () => {
    const qty = 2;
    const index = 0;
    component.newQuantity({qty, index});
    expect(component.rewards[index].quantity).toBe(2);
  });

  it('should navigate to home onCancel click', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigate').and.callThrough();
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should addSnack and navigate to home onCompleteTransaction', () => {
    const notificationService: NotificationService = fixture.debugElement.injector.get
      <NotificationService>(NotificationService as Type<NotificationService>);
    const notificationSpy = spyOn(notificationService, 'addSnack');
    const router: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(router, 'navigate').and.callThrough();

    component.onCompleteTransaction();
    expect(notificationSpy).toHaveBeenCalledWith('Transaction completed');
    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  });

});
