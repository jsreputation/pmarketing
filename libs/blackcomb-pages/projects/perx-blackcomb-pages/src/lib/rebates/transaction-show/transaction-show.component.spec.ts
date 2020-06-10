import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  Router
} from '@angular/router';
import { DatePipe } from '@angular/common';
import { TransactionShowComponent } from './transaction-show.component';

describe('TransactionShowComponent', () => {
  let component: TransactionShowComponent;
  let fixture: ComponentFixture<TransactionShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionShowComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        { provide: Router, useValue: jest.fn()},
        DatePipe
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
