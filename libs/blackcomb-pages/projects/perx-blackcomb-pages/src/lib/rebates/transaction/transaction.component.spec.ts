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
import { BehaviorSubject } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

const activatedRouteStub: Partial<ActivatedRoute> = {
  params: new BehaviorSubject({ id: 0 })
};
describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: jest.fn()},
        CurrencyPipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    component.matchingMerchant = { description: '', imgUrl: '', logo: '', merchantId: 0, name: '', rebateAmount: '' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
