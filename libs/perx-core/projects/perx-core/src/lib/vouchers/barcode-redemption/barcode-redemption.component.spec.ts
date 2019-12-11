import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { of } from 'rxjs';
import { NgxBarcodeModule } from 'ngx-barcode';

import { BarcodeRedemptionComponent } from './barcode-redemption.component';

import {IVoucherService} from '../ivoucher.service';

describe('BarcodeRedemptionComponent', () => {
  let component: BarcodeRedemptionComponent;
  let fixture: ComponentFixture<BarcodeRedemptionComponent>;

  const voucherServiceStub = {
    get: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BarcodeRedemptionComponent,
      ],
      imports: [
        NgxBarcodeModule,
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
