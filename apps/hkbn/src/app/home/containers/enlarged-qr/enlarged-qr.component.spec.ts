import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QRCodeModule } from 'angularx-qrcode';

import { EnlargedQrComponent } from './enlarged-qr.component';
import { MatButtonModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('EnlargedQrComponent', () => {
  let component: EnlargedQrComponent;
  let fixture: ComponentFixture<EnlargedQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        QRCodeModule,
        MatButtonModule,
        RouterTestingModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [EnlargedQrComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnlargedQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
