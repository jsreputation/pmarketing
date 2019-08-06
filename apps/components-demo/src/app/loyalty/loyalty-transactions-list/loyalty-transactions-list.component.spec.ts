import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoyaltyTransactionsListComponent } from './loyalty-transactions-list.component';
import { LoyaltyModule } from './../loyalty.module';

describe('TransactionsListComponent', () => {
  let component: LoyaltyTransactionsListComponent;
  let fixture: ComponentFixture<LoyaltyTransactionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyTransactionsListComponent ],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        HttpClientTestingModule,
        LoyaltyModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyTransactionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
