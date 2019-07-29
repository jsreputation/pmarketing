import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrscannerComponent } from './qrscanner.component';
import { HeaderComponent } from '../header/header.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatToolbarModule } from '@angular/material';

describe('QrscannerComponent', () => {
  let component: QrscannerComponent;
  let fixture: ComponentFixture<QrscannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrscannerComponent, HeaderComponent ],
      imports: [ ZXingScannerModule, MatToolbarModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrscannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
