import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionConditionGroupComponent } from './transaction-condition-group.component';

describe('TransactionConditionGroupComponent', () => {
  let component: TransactionConditionGroupComponent;
  let fixture: ComponentFixture<TransactionConditionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionConditionGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionConditionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
