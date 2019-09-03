import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeRedemptionComponent } from './code-redemption.component';
import { MatButtonModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VouchersModule, VouchersService, Voucher } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { mockVoucher } from '../voucher.mock';
import { NotificationWrapperService } from 'src/app/services/notification-wrapper.service';

const NotificationWrapperServiceStud = {
  addPopup: () => {}
}

describe('CodeRedemptionComponent', () => {
  let component: CodeRedemptionComponent;
  let fixture: ComponentFixture<CodeRedemptionComponent>;
  const vouchersServiceStub = {
    state: mockVoucher,
    get: (): Observable<Voucher> => of(mockVoucher),
    stateChangedForVoucher: (): Observable<Voucher> => of(vouchersServiceStub.state)
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
        { provide: VouchersService, useValue: vouchersServiceStub },
        { provide: NotificationWrapperService, useValue: NotificationWrapperServiceStud }
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
