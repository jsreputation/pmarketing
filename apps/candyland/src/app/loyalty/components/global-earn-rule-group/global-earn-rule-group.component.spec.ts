import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { GlobalEarnRuleGroupComponent } from './global-earn-rule-group.component';
import { TranslateModule } from '@ngx-translate/core';

describe('GlobalEarnRuleGroupComponent', () => {
  let component: GlobalEarnRuleGroupComponent;
  let fixture: ComponentFixture<GlobalEarnRuleGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [GlobalEarnRuleGroupComponent],
        imports: [TranslateModule.forRoot()],
        schemas: [NO_ERRORS_SCHEMA]
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
