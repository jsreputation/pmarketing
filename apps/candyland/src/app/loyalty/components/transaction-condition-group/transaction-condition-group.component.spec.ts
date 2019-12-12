import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionConditionGroupComponent } from './transaction-condition-group.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

describe('TransactionConditionGroupComponent', () => {
  let component: TransactionConditionGroupComponent;
  let fixture: ComponentFixture<TransactionConditionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), MatMenuModule],
      declarations: [TransactionConditionGroupComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionConditionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
