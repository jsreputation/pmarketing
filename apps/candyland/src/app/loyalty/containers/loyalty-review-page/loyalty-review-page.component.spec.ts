import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoyaltyReviewPageComponent } from './loyalty-review-page.component';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LoyaltyConfigService } from '../../services/loyalty-config.service';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { LoyaltyRuleService } from '@cl-core/services/loyalty-rule.service';
import { of, Subject } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { TenantStoreService, UploadFileService } from '@cl-core-services';
import { TenantMockStore } from '@cl-shared/test-components/tenant-mock-store/tenant-mock-store';
import { MockLoyaltyServices } from '@cl-shared/test-components/providers/mock-loyalty.services';
import { LoyaltyCustomTierService } from '@cl-core/services/loyalty-custom-tier.service';
import { MockLoyaltyCustomTierService } from '@cl-shared/test-components/providers/mock-loyalty-custom-tier.service';
import { MockUploadFileService } from '@cl-shared/test-components/providers/mock-upload-file.service';

describe('LoyaltyReviewComponent', () => {
  let component: LoyaltyReviewPageComponent;
  let fixture: ComponentFixture<LoyaltyReviewPageComponent>;
  const loyaltyConfigServiceStub: Partial<LoyaltyConfigService> = {
    getLoyaltyViewConfig: () => of([])
  };
  const loyaltyRuleServiceStub: Partial<LoyaltyRuleService> = {
    findAndCreateRuleSet: () => of(),
  };
  const activatedRouteStub = {
    paramMap: new Subject<ParamMap>()
  };
  const routerStub: Partial<Router> = {
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: LoyaltyConfigService, useValue: loyaltyConfigServiceStub },
        { provide: LoyaltyRuleService, useValue: loyaltyRuleServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
        { provide: TenantStoreService, useClass: TenantMockStore },
        { provide: LoyaltyService, useClass: MockLoyaltyServices },
        { provide: LoyaltyCustomTierService, useClass: MockLoyaltyCustomTierService },
        { provide: UploadFileService, useClass: MockUploadFileService },
      ],
      declarations: [LoyaltyReviewPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
