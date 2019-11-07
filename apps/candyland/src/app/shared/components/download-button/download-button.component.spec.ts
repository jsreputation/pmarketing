import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadButtonComponent } from './download-button.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DownloadButtonComponent', () => {
  let component: DownloadButtonComponent;
  let fixture: ComponentFixture<DownloadButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadButtonComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
