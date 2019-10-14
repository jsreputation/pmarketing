import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalEarnRuleComponent } from './global-earn-rule.component';

describe('GlobalEarnRuleComponent', () => {
  let component: GlobalEarnRuleComponent;
  let fixture: ComponentFixture<GlobalEarnRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalEarnRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalEarnRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
