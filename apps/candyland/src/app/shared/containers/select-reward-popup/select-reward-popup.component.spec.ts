import { HttpClientTestingModule } from '@angular/common/http/testing';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule, MatDialogRef,
  MatFormFieldModule,
  MatIconModule,
  MatPaginatorModule,
  MatTableModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { RewardsListModule } from '@cl-shared/components/rewards-list/rewards-list.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';

import { SelectRewardPopupComponent } from './select-reward-popup.component';
import { TranslateModule } from '@ngx-translate/core';
import { RewardsService } from '@cl-core-services';
import { MockRewardsServices } from '@cl-shared/test-components/providers/mock-rewards.services';

describe('SelectRewardPopupComponent', () => {
  let component: SelectRewardPopupComponent;
  let fixture: ComponentFixture<SelectRewardPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RewardsListModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        SearchFilterModule,
        ButtonModule,
        MatFormFieldModule,
        TableFiltersModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        {
          provide: RewardsService, useClass: MockRewardsServices
        }
      ],
      declarations: [ SelectRewardPopupComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRewardPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
