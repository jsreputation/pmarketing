import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstantRewardManagePageComponent } from './new-instant-reward-manage-page.component';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { InstantRewardsService, TenantStoreService } from '@cl-core-services';
import { TenantMockStore } from '@cl-shared/test-components/tenant-mock-store/tenant-mock-store';
import { MockInstantRewardsService } from '@cl-shared/test-components/providers/mock-instant-rewards.service';
import { TestComponentsModule } from '@cl-shared/test-components/test-components.module';

describe('NewInstantRewardManagePageComponent', () => {
  let component: NewInstantRewardManagePageComponent;
  let fixture: ComponentFixture<NewInstantRewardManagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        TestComponentsModule,
      ],
      providers: [
        {provide: LocalStorageService, useValue: {}},
        { provide: TenantStoreService, useClass: TenantMockStore },
        { provide: InstantRewardsService, useClass: MockInstantRewardsService },
      ],
      declarations: [NewInstantRewardManagePageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInstantRewardManagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
