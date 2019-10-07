import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingGraphicComponent } from './rating-graphic.component';

describe('RatingGraphicComponent', () => {
  let component: RatingGraphicComponent;
  let fixture: ComponentFixture<RatingGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingGraphicComponent ]
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
