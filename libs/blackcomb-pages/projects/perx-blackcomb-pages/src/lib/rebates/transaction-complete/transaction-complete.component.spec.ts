import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { TransactionCompleteComponent } from './transaction-complete.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TransactionCompleteComponent', () => {
  let component: TransactionCompleteComponent;
  let fixture: ComponentFixture<TransactionCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionCompleteComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCompleteComponent);
    component = fixture.componentInstance;
    component.transactionObject = { logo: '', name: '', rebateBurned: '', rebateGained: '', transactionAmount: '' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
