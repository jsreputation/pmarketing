import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeRedemptionComponent } from './code-redemption.component';
import { MatButtonModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VouchersModule, VouchersService, Voucher } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { mockVoucher } from '../voucher.mock';

describe('CodeRedemptionComponent', () => {
  let component: CodeRedemptionComponent;
  let fixture: ComponentFixture<CodeRedemptionComponent>;
  const vouchersServiceStub = {
    get: (): Observable<Voucher> => of(mockVoucher)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        VouchersModule
      ],
      providers: [
        { provide: VouchersService, useValue: vouchersServiceStub }
      ],
      declarations: [CodeRedemptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
