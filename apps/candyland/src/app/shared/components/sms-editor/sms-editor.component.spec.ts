import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SmsEditorComponent } from './sms-editor.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import { MockUploadFileService } from '@cl-shared/test-components/providers/mock-upload-file.service';
import { UploadFileService } from '@cl-core-services';

describe('SmsEditorComponent', () => {
  let component: SmsEditorComponent;
  let fixture: ComponentFixture<SmsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsEditorComponent ],
      imports: [ TranslateModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [{ provide: UploadFileService, useClass: MockUploadFileService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
