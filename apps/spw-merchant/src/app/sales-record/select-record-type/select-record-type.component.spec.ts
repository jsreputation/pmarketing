import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { SelectRecordTypeComponent } from './select-record-type.component';
import { TranslateModule } from '@ngx-translate/core';
import { IMerchantAdminService, NotificationService } from '@perxtech/core';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';

describe('SelectRecordTypeComponent', () => {
  let component: SelectRecordTypeComponent;
  let fixture: ComponentFixture<SelectRecordTypeComponent>;
  history.pushState({ data: '{"id": 1234, "name": "John", "rewardId": 149}' }, '', '');
  const routerStub = { navigate: () => ({})};
  const merchantAdminServiceStub: Partial<IMerchantAdminService> = {
    getCustomerDetails: () => of()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        MatButtonModule
      ],
      declarations: [ SelectRecordTypeComponent ],
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
    fixture = TestBed.createComponent(SelectRecordTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
