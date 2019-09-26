import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletComponent } from './wallet.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material';
import { IVoucherService, Voucher, VouchersModule } from '@perx/core';
import { Observable, of } from 'rxjs';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;
  const vouchersServiceStub = {
    getAll: (): Observable<Voucher[]> => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletComponent ],
      imports: [
        NoopAnimationsModule,
        MatTabsModule,
        VouchersModule
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
