import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemComponent } from './redeem.component';
import { RouterTestingModule } from '@angular/router/testing';
import { VouchersModule } from '../../vouchers/vouchers.module';
import { IVoucherService } from '../../vouchers/ivoucher.service';

describe('RedeemComponent', () => {
  let component: RedeemComponent;
  let fixture: ComponentFixture<RedeemComponent>;
  const vouchersServiceStub = {
    // getAll: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedeemComponent],
      imports: [
        RouterTestingModule,
        VouchersModule
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
