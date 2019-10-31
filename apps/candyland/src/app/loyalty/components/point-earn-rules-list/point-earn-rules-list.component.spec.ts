import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointEarnRulesListComponent } from './point-earn-rules-list.component';

describe('PointEarnRulesListComponent', () => {
  let component: PointEarnRulesListComponent;
  let fixture: ComponentFixture<PointEarnRulesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointEarnRulesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointEarnRulesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
