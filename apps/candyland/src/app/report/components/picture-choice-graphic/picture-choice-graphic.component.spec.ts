import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureChoiceGraphicComponent } from './picture-choice-graphic.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PictureChoiceGraphicComponent', () => {
  let component: PictureChoiceGraphicComponent;
  let fixture: ComponentFixture<PictureChoiceGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureChoiceGraphicComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureChoiceGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
