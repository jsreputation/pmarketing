import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiplierResultGroupComponent } from './multiplier-result-group.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('AmountConditionGroupComponent', () => {
  let component: MultiplierResultGroupComponent;
  let fixture: ComponentFixture<MultiplierResultGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [MultiplierResultGroupComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiplierResultGroupComponent);
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
