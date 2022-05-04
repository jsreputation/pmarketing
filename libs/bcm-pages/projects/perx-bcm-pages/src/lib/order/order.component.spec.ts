import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderComponent } from './order.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { IMerchantAdminService, NotificationService } from '@perxtech/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  history.pushState({ data: '{"id": 1234, "name": "John", "rewardId": 149}' }, '', '');

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderComponent,
      ],
      imports: [
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: IMerchantAdminService, useValue: merchantAdminServiceStub },
        {
          provide: NotificationService, useValue: {
            addSnack: () => {
            }
          }
        },
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
  });

  it('should navigate to home onCancel click', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    spyOn(router, 'navigate').and.callThrough();
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

});
