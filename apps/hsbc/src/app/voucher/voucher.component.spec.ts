import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherComponent } from './voucher.component';
import { VouchersModule, CampaignModule } from '@perx/core/dist/perx-core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('VoucherComponent', () => {
  let component: VoucherComponent;
  let fixture: ComponentFixture<VoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherComponent],
      imports: [
        HttpClientTestingModule,
        CampaignModule.forRoot({ env: environment }),
        VouchersModule.forRoot({ env: environment }),
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
