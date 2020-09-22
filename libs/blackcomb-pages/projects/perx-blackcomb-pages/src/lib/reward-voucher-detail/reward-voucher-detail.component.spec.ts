import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardVoucherDetailComponent } from './reward-voucher-detail.component';

describe('RewardVoucherDetailComponent', () => {
  let component: RewardVoucherDetailComponent;
  let fixture: ComponentFixture<RewardVoucherDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardVoucherDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardVoucherDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
