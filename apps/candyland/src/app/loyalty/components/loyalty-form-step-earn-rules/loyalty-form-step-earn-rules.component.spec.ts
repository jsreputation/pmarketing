import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyFormStepEarnRulesComponent } from './loyalty-form-step-earn-rules.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CustomDataSource } from '@cl-shared/table';
import { of } from 'rxjs';

describe('LoyaltyFormStepEarnRulesComponent', () => {
  let component: LoyaltyFormStepEarnRulesComponent;
  let fixture: ComponentFixture<LoyaltyFormStepEarnRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltyFormStepEarnRulesComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyFormStepEarnRulesComponent);
    component = fixture.componentInstance;
    component.customTierDataSource = new CustomDataSource({
      getTableData: (params: any) => of({

        data: [(params)],
        meta: {
          page_count: 1,
          record_count: 3
        }
      })
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
