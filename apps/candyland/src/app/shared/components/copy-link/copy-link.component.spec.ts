import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyLinkComponent } from './copy-link.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import {MessageService} from '@cl-core-services';

describe('DownloadLinkComponent', () => {
  let component: CopyLinkComponent;
  let fixture: ComponentFixture<CopyLinkComponent>;
  const msgSvcStub: Partial<MessageService> = {
    show: () => ({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserDynamicTestingModule,
      ],
      providers: [
        {
          provide: MessageService, useValue: msgSvcStub
        }
      ],
      declarations: [ CopyLinkComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
