import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTextGraphicComponent } from './long-text-graphic.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LongTextGraphicComponent', () => {
  let component: LongTextGraphicComponent;
  let fixture: ComponentFixture<LongTextGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTextGraphicComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTextGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
