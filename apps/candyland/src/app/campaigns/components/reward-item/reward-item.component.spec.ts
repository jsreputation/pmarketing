import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardItemComponent } from './reward-item.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    group = new FormGroup({
      test: new FormControl(),
      test2: new FormGroup({probability: new FormControl(null)}, [])
    });
    component.group = (group.get('test2') as FormGroup);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
