import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PointEarnRulesListComponent } from './point-earn-rules-list.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { MatMenuModule, MatTableModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@Pipe({
  name: 'clConditionInfo'
})
export class ConditionInfoPipe implements PipeTransform {
  public transform(conditions: any[]): string {
    return conditions.toString();
  }
}

describe('PointEarnRulesListComponent', () => {
  let component: PointEarnRulesListComponent;
  let fixture: ComponentFixture<PointEarnRulesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), MatMenuModule, MatTableModule],
      declarations: [PointEarnRulesListComponent, ConditionInfoPipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointEarnRulesListComponent);
    component = fixture.componentInstance;
    component.ruleSet = {rules: []};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
