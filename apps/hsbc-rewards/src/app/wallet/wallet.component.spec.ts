import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletComponent } from './wallet.component';
import { VouchersModule } from '@perxtech/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule } from '@angular/material';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WalletComponent],
      imports: [
        VouchersModule,
        RouterTestingModule,
        MatTabsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
