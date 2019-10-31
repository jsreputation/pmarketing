import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointEarnRulesGroupComponent } from './point-earn-rules-group.component';

describe('PointEarnRulesGroupComponent', () => {
  let component: PointEarnRulesGroupComponent;
  let fixture: ComponentFixture<PointEarnRulesGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointEarnRulesGroupComponent ]
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
