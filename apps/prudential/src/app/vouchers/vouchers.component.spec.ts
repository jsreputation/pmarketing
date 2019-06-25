import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersComponent, POPUP_TYPE } from './vouchers.component';
import { VouchersModule } from '@perx/core/dist/perx-core';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from 'src/testing/activated-route-stub';
import { MatDialogStub } from 'src/testing/mat-dialog-stub';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const activatedRouteStub = new ActivatedRouteStub();
  const matDialogStub = new MatDialogStub();
  const spy = routerSpy.navigate as jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VouchersComponent],
      imports: [
        HttpClientTestingModule,
        VouchersModule.forRoot({ env: { apiHost: '' } })
      ],
      providers: [
        DatePipe,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: MatDialog, useValue: matDialogStub }
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
    activatedRouteStub.setParamMap({ popup: POPUP_TYPE.completed });
    component.ngOnInit();
    expect(matDialogStub.params.data.title).toBe('You\'ve already completed the game');
  });

  it('should open expired dialog', () => {
    activatedRouteStub.setParamMap({ popup: POPUP_TYPE.expired });
    component.ngOnInit();
    expect(matDialogStub.params.data.title).toBe('We\'re sorry, the treats have expired');
  });

  it('should open 404 dialog', () => {
    activatedRouteStub.setParamMap({ popup: POPUP_TYPE.four0four });
    component.ngOnInit();
    expect(matDialogStub.params.data.title).toBe('What you are looking for does not exist');
  });
});
