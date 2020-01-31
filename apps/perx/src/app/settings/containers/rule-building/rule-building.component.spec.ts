import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleBuildingComponent } from './rule-building.component';

describe('RuleBuildingComponent', () => {
  let component: RuleBuildingComponent;
  let fixture: ComponentFixture<RuleBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
