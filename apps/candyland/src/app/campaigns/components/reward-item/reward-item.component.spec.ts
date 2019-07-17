import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardItemComponent } from './reward-item.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RewardItemComponent', () => {
  let component: RewardItemComponent;
  let fixture: ComponentFixture<RewardItemComponent>;
  let group: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RewardItemComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardItemComponent);
    component = fixture.componentInstance;
    group = new FormGroup({}, []);
    component.group = group;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
