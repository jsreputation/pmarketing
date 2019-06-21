import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersComponent } from './vouchers.component';
import { MatCardModule, MatRippleModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VouchersModule } from './vouchers.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatRippleModule,
        HttpClientTestingModule,
        RouterTestingModule,
        VouchersModule.forRoot({ env: { apiHost: '' } })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
