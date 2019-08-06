import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatTabsModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoyaltyTransactionsListComponent } from './loyalty-transactions-list.component';
import { LoyaltyModule as PerxLoyaltyModule} from '@perx/core';
import { environment } from 'src/environments/environment';

describe('TransactionsListComponent', () => {
  let component: LoyaltyTransactionsListComponent;
  let fixture: ComponentFixture<LoyaltyTransactionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyTransactionsListComponent ],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatTabsModule,
        HttpClientTestingModule,
        PerxLoyaltyModule.forRoot({ env: environment })
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
