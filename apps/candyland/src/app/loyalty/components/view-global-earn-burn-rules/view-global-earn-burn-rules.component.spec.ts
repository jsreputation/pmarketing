import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ViewGlobalEarnBurnRulesComponent } from './view-global-earn-burn-rules.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ViewGlobalEarnBurnRulesComponent', () => {
  let component: ViewGlobalEarnBurnRulesComponent;
  let fixture: ComponentFixture<ViewGlobalEarnBurnRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewGlobalEarnBurnRulesComponent],
      imports: [TranslateModule.forRoot()
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
