import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { TransactionComponent } from './transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  BehaviorSubject,
  of
} from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import {
  ILoyalty,
  LoyaltyService,
} from '@perxtech/core';

const activatedRouteStub: Partial<ActivatedRoute> = {
  params: new BehaviorSubject({ id: 0 })
};
describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  const mockLoyalty: ILoyalty = {
    id: 42,
    name: 'joe',
    pointsBalance: 42
  };
  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of([mockLoyalty]),
    getLoyalty: () => of(mockLoyalty)
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: jest.fn()},
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        CurrencyPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    // component.matchingMerchant = { description: '', imgUrl: '', logo: '', merchantId: 0, name: '', rebateAmount: '' };
    component.matchingMerchant = { description: '', id: 0, name: '', pointsBalance: 0 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
