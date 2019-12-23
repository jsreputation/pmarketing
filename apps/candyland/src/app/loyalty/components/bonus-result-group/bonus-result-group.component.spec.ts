import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BonusResultGroupComponent } from './bonus-result-group.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('AmountConditionGroupComponent', () => {
  let component: BonusResultGroupComponent;
  let fixture: ComponentFixture<BonusResultGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [BonusResultGroupComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonusResultGroupComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      operator: new FormControl(),
      value: new FormControl()
    });
    component.config = {ruleOperators: []};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
