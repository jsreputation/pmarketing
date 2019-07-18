import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAudiencePageComponent } from './new-audience-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NewAudiencePageComponent', () => {
  let component: NewAudiencePageComponent;
  let fixture: ComponentFixture<NewAudiencePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAudiencePageComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAudiencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
