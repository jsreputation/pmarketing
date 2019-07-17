import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementItemComponent } from './engagement-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('EngagementItemComponent', () => {
  let component: EngagementItemComponent;
  let fixture: ComponentFixture<EngagementItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementItemComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
