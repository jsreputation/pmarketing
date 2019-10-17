import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalBurnRuleGroupComponent } from './global-burn-rule-group.component';

describe('GlobalBurnRuleGroupComponent', () => {
  let component: GlobalBurnRuleGroupComponent;
  let fixture: ComponentFixture<GlobalBurnRuleGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalBurnRuleGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalBurnRuleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
