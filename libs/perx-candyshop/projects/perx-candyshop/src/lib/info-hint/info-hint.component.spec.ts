import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHintComponent } from './info-hint.component';
import { MatIconModule } from '@angular/material';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InfoHintComponent', () => {
  let component: InfoHintComponent;
  let fixture: ComponentFixture<InfoHintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      declarations: [InfoHintComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
