import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationCodeComponent } from './activation-code.component';
import { PerxCoreModule } from '@perx/core/dist/perx-core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material';
import { VouchersModule } from '@perx/core/dist/perx-core';

describe('ActivationCodeComponent', () => {
  let component: ActivationCodeComponent;
  let fixture: ComponentFixture<ActivationCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationCodeComponent],
      imports: [
        RouterTestingModule,
        VouchersModule.forRoot({ env: { apiHost: '' } }),
        PerxCoreModule,
        MatCardModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
