import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletComponent } from './wallet.component';
import { VouchersModule } from '@perx/core';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavigateToolbarModule } from '../navigate-toolbar/navigate-toolbar.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletComponent ],
      imports: [
        VouchersModule.forRoot({
          env: environment
        }),
        HttpClientTestingModule,
        NavigateToolbarModule,
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
