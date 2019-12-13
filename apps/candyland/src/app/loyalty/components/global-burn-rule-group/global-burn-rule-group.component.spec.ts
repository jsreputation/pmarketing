import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GlobalBurnRuleGroupComponent } from './global-burn-rule-group.component';
import { TranslateModule } from '@ngx-translate/core';

describe('GlobalBurnRuleGroupComponent', () => {
  let component: GlobalBurnRuleGroupComponent;
  let fixture: ComponentFixture<GlobalBurnRuleGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalBurnRuleGroupComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
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
