import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrScannerComponent } from './qrscanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import {MatToolbarModule, MatIconModule, MatDialogRef, MatDialogModule} from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';

describe('QrScannerComponent', () => {
  let component: QrScannerComponent;
  let fixture: ComponentFixture<QrScannerComponent>;
  let params: Subject<Params>;

  beforeEach(async(() => {
    params = new Subject<Params>();

    TestBed.configureTestingModule({
      declarations: [ QrScannerComponent ],
      imports: [
        ZXingScannerModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {params} },
        { provide: MatDialogRef, useValue: { close: () => { } } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
