import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VouchersModule, IVoucherService, RewardsService } from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ListComponent } from './list.component';
import { of } from 'rxjs';
import { IReward } from '@perxtech/core';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const voucherServiceStub: Partial<IVoucherService> = {
    getAll: () => of([])
  };
  const mockReward: IReward = {
    id: 1,
    name: '',
    description: '',
    subtitle: '',
    validFrom: new Date(),
    validTo: new Date(),
    rewardBanner: '',
    merchantImg: '',
    termsAndConditions: '',
    howToRedeem: '',
  };
  const rewardServiceStub: Partial<RewardsService> = {
    getReward: () => of(mockReward)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        VouchersModule,
        RouterTestingModule
      ],
      providers: [
        { provide: IVoucherService, useValue: voucherServiceStub },
        { provide: RewardsService, useValue: rewardServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
