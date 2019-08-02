import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { HeaderComponent } from '../header/header.component';
import { OrderQuantityComponent } from '../order/order-quantity/order-quantity.component';
import { MatToolbarModule, MatListModule, MatDividerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderComponent,
        HeaderComponent,
        OrderQuantityComponent
      ],
      imports: [ MatToolbarModule, FormsModule, MatListModule, MatDividerModule ],
      providers: [
        { provide: Router, useValue: routerStub }
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
});
