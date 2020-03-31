import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AudiencesUserInfoPageComponent } from './audiences-user-info-page.component';
import {
  MatFormFieldModule, MatInputModule, MatTableModule, MatTabsModule, MatIconModule,
  MatMenuModule, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatSortModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { TableFiltersModule, SearchFilterModule, PaginationModule, PipesModule } from '@cl-shared';
import { ButtonModule, StatusLabelModule } from '@perxtech/candyshop';
import { TabsFilterModule } from '../../../shared/table/tabs-filter/tabs-filter.module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AudiencesVouchersService, CommsService, MessageService, RewardsService } from '@cl-core-services';
import { MockRewardsServices } from '@cl-shared/test-components/providers/mock-rewards.services';
import { MockCommsServices } from '@cl-shared/test-components/providers/mock-comms.services';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockAudiencesUserService } from '@cl-shared/test-components/providers/mock-audiences-user.service';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { MockLoyaltyServices } from '@cl-shared/test-components/providers/mock-loyalty.services';
import { MockLoyaltyCardService } from '@cl-shared/test-components/providers/mock-loyalty-card.service';
import { LoyaltyCardService } from '@cl-core/services/loyalty-card.service';
import { MockAudiensesVouchersService } from '@cl-shared/test-components/providers/mock-audienses-vouchers.service';

describe('AudiencesUserInfoPageComponent', () => {
  let component: AudiencesUserInfoPageComponent;
  let fixture: ComponentFixture<AudiencesUserInfoPageComponent>;
  const messageServiceStub: Partial<MessageService> = {
    show: () => ({})
  };
  const matDialogRefStub: Partial<MatDialogRef<any>> = {
    close: () => { }
  };
  const matDialogDataStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatTableModule,
        MatSortModule,
        PaginationModule,
        TableFiltersModule,
        SearchFilterModule,
        ButtonModule,
        TabsFilterModule,
        MatTabsModule,
        BrowserDynamicTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatMenuModule,
        StatusLabelModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatDialogModule,
        BrowserDynamicTestingModule,
        PipesModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: MessageService, useValue: messageServiceStub },
        { provide: MatDialogRef, useValue: matDialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: matDialogDataStub },
        { provide: RewardsService, useClass: MockRewardsServices },
        { provide: CommsService, useClass: MockCommsServices },
        { provide: AudiencesUserService, useClass: MockAudiencesUserService },
        { provide: LoyaltyService, useClass: MockLoyaltyServices },
        { provide: LoyaltyCardService, useClass: MockLoyaltyCardService },
        { provide: AudiencesVouchersService, useClass: MockAudiensesVouchersService },

      ],
      declarations: [
        AudiencesUserInfoPageComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencesUserInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
