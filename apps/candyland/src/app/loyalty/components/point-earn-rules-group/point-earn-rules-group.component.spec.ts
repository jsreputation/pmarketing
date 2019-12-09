import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointEarnRulesGroupComponent } from './point-earn-rules-group.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PointEarnRulesGroupComponent', () => {
  let component: PointEarnRulesGroupComponent;
  let fixture: ComponentFixture<PointEarnRulesGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointEarnRulesGroupComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointEarnRulesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
