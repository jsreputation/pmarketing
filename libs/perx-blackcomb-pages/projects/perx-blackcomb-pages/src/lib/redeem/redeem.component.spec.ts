import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RedeemComponent } from './redeem.component';
import { VouchersModule, IVoucherService, InstantOutcomeService } from '@perx/core';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
// import { of } from 'rxjs';

describe('RedeemComponent', () => {
  let component: RedeemComponent;
  let fixture: ComponentFixture<RedeemComponent>;
  const vouchersServiceStub = {
    // getAll: () => of([])
  };
  const outcomeServiceStub = {
    getFromCampaign: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedeemComponent],
      imports: [
        RouterTestingModule,
        VouchersModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: InstantOutcomeService, useValue: outcomeServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
