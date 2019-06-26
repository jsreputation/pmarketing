import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StampRulePopupComponent } from './stamp-rule-popup.component';

describe('StampRulePopupComponent', () => {
  let component: StampRulePopupComponent;
  let fixture: ComponentFixture<StampRulePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StampRulePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampRulePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
