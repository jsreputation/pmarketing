import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersComponent, PopupType } from './vouchers.component';
import { VouchersModule,  IVoucherService } from '@perx/core';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { MatDialogStub } from 'src/testing/mat-dialog-stub';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const activatedRouteStub = new ActivatedRouteStub();
  const matDialogStub = new MatDialogStub();
  const spy = routerSpy.navigate as jasmine.Spy;
  const voucherServiceStub = {
    get: () => {
      return of('')
    },
    getAll: () => {
      return of ('');
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VouchersComponent],
      imports: [
        NoopAnimationsModule,
        VouchersModule
      ],
      providers: [
        DatePipe,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: MatDialog, useValue: matDialogStub },
        { provide: IVoucherService, useValue: voucherServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spy.calls.reset();
  });

  afterEach(() => {
    spy.calls.reset();
    activatedRouteStub.setParamMap({});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to voucher page', () => {
    component.onRoute('234');
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.first().args[0]).toEqual(['/vouchers/234']);
  });

  it('should open completed dialog', () => {
    activatedRouteStub.setParamMap({ popup: PopupType.completed });
    component.ngOnInit();
    expect(matDialogStub.params.data.title).toBe('You\'ve already completed the game');
  });

  it('should open expired dialog', () => {
    activatedRouteStub.setParamMap({ popup: PopupType.expired });
    component.ngOnInit();
    expect(matDialogStub.params.data.title).toBe('We\'re sorry, the treats have expired');
  });

  it('should open 404 dialog', () => {
    activatedRouteStub.setParamMap({ popup: PopupType.four0four });
    component.ngOnInit();
    expect(matDialogStub.params.data.title).toBe('What you are looking for does not exist');
  });
});
