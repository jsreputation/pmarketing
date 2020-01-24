import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddLoyaltyPopupComponent } from './add-loyalty-popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatIconModule, MatDatepickerModule, MatMenuModule } from '@angular/material';
import { DatePickerModule } from '@cl-shared';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from '@cl-core-services';
import { LoyaltyCardService } from '@cl-core/services/loyalty-card.service';
import { MockLoyaltyCardService } from '@cl-shared/test-components/providers/mock-loyalty-card.service';
import { ButtonModule } from '@perx/candyshop';

describe('AddLoyaltyPopupComponent', () => {
  let component: AddLoyaltyPopupComponent;
  let fixture: ComponentFixture<AddLoyaltyPopupComponent>;
  const msgSvcStub: Partial<MessageService> = {
    show: () => ({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        DatePickerModule,
        ButtonModule,
        MatIconModule,
        MatMenuModule,
        BrowserDynamicTestingModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {
            }
          },
        },
        {
          provide: MessageService, useValue: msgSvcStub
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: LoyaltyCardService, useClass: MockLoyaltyCardService }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddLoyaltyPopupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLoyaltyPopupComponent);
    component = fixture.componentInstance;
    component.data = { loyaltySelectOptions: [], userId: 1 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
