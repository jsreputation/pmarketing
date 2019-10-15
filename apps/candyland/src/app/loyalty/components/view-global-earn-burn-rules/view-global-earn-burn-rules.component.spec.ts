import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGlobalEarnBurnRulesComponent } from './view-global-earn-burn-rules.component';

describe('ViewGlobalEarnBurnRulesComponent', () => {
  let component: ViewGlobalEarnBurnRulesComponent;
  let fixture: ComponentFixture<ViewGlobalEarnBurnRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGlobalEarnBurnRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGlobalEarnBurnRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
