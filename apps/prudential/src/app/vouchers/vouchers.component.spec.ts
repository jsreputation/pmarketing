import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { VouchersComponent } from './vouchers.component';
import { VouchersModule } from '@perx/core/dist/perx-core';
import { MatDialogModule } from '@angular/material';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

describe('VouchersComponent', () => {
  let component: VouchersComponent;
  let fixture: ComponentFixture<VouchersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VouchersComponent ],
      imports: [
        HttpClientModule,
        VouchersModule.forRoot({ env: { apiHost: '' } }),
        MatDialogModule,
        RouterModule.forRoot([])
      ],
      providers: [
        DatePipe
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
