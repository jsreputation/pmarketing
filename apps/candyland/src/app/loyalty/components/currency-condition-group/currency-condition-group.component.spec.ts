import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConditionGroupComponent } from './currency-condition-group.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('AmountConditionGroupComponent', () => {
  let component: CurrencyConditionGroupComponent;
  let fixture: ComponentFixture<CurrencyConditionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [CurrencyConditionGroupComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConditionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
