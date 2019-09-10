import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VoucherComponent } from './voucher.component';
import { VouchersModule, ConfigModule } from '@perx/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('VoucherComponent', () => {
  let component: VoucherComponent;
  let fixture: ComponentFixture<VoucherComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherComponent ],
      imports: [
        ConfigModule.forRoot({}),
        HttpClientTestingModule,
        VouchersModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to activation page', () => {
    spyOn(router, 'navigate').and.stub();
    const id = '1';
    component.onRedeem(id);
    expect(router.navigate).toHaveBeenCalledWith([`/activation/${id}`]);
  });
});
