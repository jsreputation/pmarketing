import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherDetailsComponent } from './voucher-details.component';
import {
  VouchersModule,
} from '@perx/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VoucherDetailsComponent', () => {
  let component: VoucherDetailsComponent;
  let fixture: ComponentFixture<VoucherDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        VouchersModule.forRoot( {env: {apiHost: ''}}),
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [ VoucherDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
