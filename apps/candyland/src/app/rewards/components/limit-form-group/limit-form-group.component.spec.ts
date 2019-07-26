import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LimitFormGroupComponent} from './limit-form-group.component';

describe('LimitFormGroupComponent', () => {
  let component: LimitFormGroupComponent;
  let fixture: ComponentFixture<LimitFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LimitFormGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
