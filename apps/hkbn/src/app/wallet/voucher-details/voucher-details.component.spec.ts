import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherDetailsComponent } from './voucher-details.component';
import {
  VouchersModule,
} from '@perx/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { VouchersService } from '@perx/core';

describe('VoucherDetailsComponent', () => {
  let component: VoucherDetailsComponent;
  let fixture: ComponentFixture<VoucherDetailsComponent>;
  let vouchersService: VouchersService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        VouchersModule.forRoot({env: {apiHost: ''}}),
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({id: 1}))
          }
        }
      ],
      declarations: [VoucherDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherDetailsComponent);
    component = fixture.componentInstance;
    vouchersService = TestBed.get(VouchersService);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set voucherId by url param', () => {
    expect(component.voucherId).toBe(1);
  });

  it('should redirect to qrCode page when call onRedeem, when redemption type equal qrcode', () => {
    spyOn(vouchersService, 'get').and.returnValue(of({redemptionType: 'qrcode'} as any));
    const routerSpy = spyOn(router, 'navigate');
    component.onRedeem(1);
    expect(routerSpy).toHaveBeenCalledWith(['/wallet/1/qrcode']);
  });

  it('should redirect to code page when call onRedeem, when redemption type not equal qrcode', () => {
    spyOn(vouchersService, 'get').and.returnValue(of({redemptionType: 'code'} as any));
    const routerSpy = spyOn(router, 'navigate');
    component.onRedeem(1);
    expect(routerSpy).toHaveBeenCalledWith(['/wallet/1/code']);
  });
});
