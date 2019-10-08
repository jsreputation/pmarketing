import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingGraphicComponent } from './rating-graphic.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('RatingGraphicComponent', () => {
  let component: RatingGraphicComponent;
  let fixture: ComponentFixture<RatingGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingGraphicComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
