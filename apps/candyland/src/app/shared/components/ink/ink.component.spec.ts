import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InkComponent } from './ink.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InkComponent', () => {
  let component: InkComponent;
  let fixture: ComponentFixture<InkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InkComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
