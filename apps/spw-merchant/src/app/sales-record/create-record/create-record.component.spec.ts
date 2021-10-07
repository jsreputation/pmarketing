import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecordComponent } from './create-record.component';
import { Router} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMerchantAdminService, NotificationService } from '@perxtech/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateRecordComponent', () => {
  let component: CreateRecordComponent;
  let fixture: ComponentFixture<CreateRecordComponent>;
  const routerStub = { navigate: () => ({}) };
  const merchantAdminServiceStub: Partial<IMerchantAdminService> = {
    createTransaction: () => of()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgxBarcode6Module,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [ CreateRecordComponent ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: IMerchantAdminService, useValue: merchantAdminServiceStub },
        { provide: NotificationService, useValue: {
          addSnack : () => {} }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
