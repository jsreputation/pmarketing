import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { WalletComponent } from './wallet.component';
import { MatTabsModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { VouchersModule, VouchersService, Voucher } from '@perx/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { vouchers } from 'src/assets/mock/vouchers.mock';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;
  const vouchersServiceStub = {
    getAll: (): Observable<Voucher[]> => of(vouchers)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        VouchersModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: VouchersService, useValue: vouchersServiceStub }
      ],
      declarations: [WalletComponent]
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

  it('should navigate to specific wallet page by id when call onRoute method', () => {
    const router = TestBed.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    component.onRoute({ id: 1 } as any);
    expect(routerSpy).toHaveBeenCalledWith(['/wallet/1']);
  });

  it('should filter voucher', fakeAsync(()=>{

  }));
});
