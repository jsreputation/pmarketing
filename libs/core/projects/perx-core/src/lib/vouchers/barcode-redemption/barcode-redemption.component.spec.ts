import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { of } from 'rxjs';
import { NgxBarcode6Module } from 'ngx-barcode6';

import { BarcodeRedemptionComponent } from './barcode-redemption.component';

import {IVoucherService} from '../ivoucher.service';

describe('BarcodeRedemptionComponent', () => {
  let component: BarcodeRedemptionComponent;
  let fixture: ComponentFixture<BarcodeRedemptionComponent>;

  const voucherServiceStub: Partial<IVoucherService> = {
    get: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BarcodeRedemptionComponent,
      ],
      imports: [
        NgxBarcode6Module,
      ],
      providers: [
        {
          provide: IVoucherService,
          useValue: voucherServiceStub,
        },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
