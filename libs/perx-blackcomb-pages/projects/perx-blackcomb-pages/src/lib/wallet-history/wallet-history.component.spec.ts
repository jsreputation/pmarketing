import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IVoucherService, VouchersModule } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { WalletHistoryComponent } from './wallet-history.component';
import { of } from 'rxjs';
import { MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WalletHistoryComponent', () => {
  let component: WalletHistoryComponent;
  let fixture: ComponentFixture<WalletHistoryComponent>;

  const router = {
    navigate: () => { }
  };
  const vouchersServiceStub: Partial<IVoucherService> = {
    getAll: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WalletHistoryComponent],
      imports: [
        VouchersModule,
        RouterTestingModule,
        MatTabsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: IVoucherService, useValue: vouchersServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
