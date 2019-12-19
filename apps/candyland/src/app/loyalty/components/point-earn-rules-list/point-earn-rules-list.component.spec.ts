import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PointEarnRulesListComponent } from './point-earn-rules-list.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { MatMenuModule, MatTableModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { ILoyaltyRuleCondition, ILoyaltyRuleSet } from '@cl-core/models/loyalty/loyalty-rules.model';

@Pipe({
  name: 'clConditionInfo'
})
export class ConditionInfoPipe implements PipeTransform {
  public transform(conditions: ILoyaltyRuleCondition[]): string {
    return conditions.toString();
  }
}

@Pipe({
  name: 'clPointsEarnedInfo'
})
export class PointsEarnedInfo implements PipeTransform {
  public transform(point: any): string {
    return point.toString();
  }
}

describe('PointEarnRulesListComponent', () => {
  let component: PointEarnRulesListComponent;
  let fixture: ComponentFixture<PointEarnRulesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), MatMenuModule, MatTableModule],
      declarations: [PointEarnRulesListComponent, ConditionInfoPipe, PointsEarnedInfo],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointEarnRulesListComponent);
    component = fixture.componentInstance;
    component.ruleSet = {rules: []} as ILoyaltyRuleSet;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
