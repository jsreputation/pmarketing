import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersComponent } from './vouchers.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { IVoucherService } from '@perx/core';
import { of } from 'rxjs';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { Router } from '@angular/router';
import { Type } from '@angular/core';
import { vouchers } from 'src/app/vouchers.mock';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;
  let router: Router;
  const vouchersServiceStub = {
    getAll: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VouchersComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        RouterTestingModule.withRoutes([{
          path: 'voucher',
          component: VouchersComponent
        }]),
        NgxMultiLineEllipsisModule
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersComponent);
    component = fixture.componentInstance;
    router = TestBed.get<Router>(Router as Type<Router>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate', () => {
    const spyRouter = spyOn(router, 'navigate');
    component.voucherSelected(vouchers[0]);
    expect(spyRouter).toHaveBeenCalled();
  });

  it('should change status of hideSeeMore', () => {
    component.seeMoreClicked();
    expect(component.hideSeeMore).toBe(true);
  });
});
