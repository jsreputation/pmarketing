import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadLinkComponent } from './download-link.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DownloadLinkComponent', () => {
  let component: DownloadLinkComponent;
  let fixture: ComponentFixture<DownloadLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadLinkComponent],
      imports: [],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
