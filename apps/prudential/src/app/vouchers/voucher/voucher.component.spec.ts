import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from "@angular/common";
import { VoucherComponent } from './voucher.component';
import { VouchersModule } from '@perx/core/dist/perx-core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('VoucherComponent', () => {
  let component: VoucherComponent;
  let fixture: ComponentFixture<VoucherComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherComponent ],
      imports: [
        HttpClientTestingModule,
        VouchersModule.forRoot({ env: { apiHost: '' } }),
        RouterTestingModule
      ]
    })
    .compileComponents();
    location = TestBed.get(Location);
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

  it('should redirect', () => {
    spyOn(router, 'navigate').and.stub();
    const id = '1';
    component.onRedeem(id);
    expect(router.navigate).toHaveBeenCalledWith([`/activation/${id}`]);
  });
});
