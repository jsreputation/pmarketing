import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalEarnRuleGroupComponent } from './global-earn-rule-group.component';

describe('GlobalEarnRuleGroupComponent', () => {
  let component: GlobalEarnRuleGroupComponent;
  let fixture: ComponentFixture<GlobalEarnRuleGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalEarnRuleGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalEarnRuleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
