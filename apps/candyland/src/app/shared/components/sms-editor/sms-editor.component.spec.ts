import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SmsEditorComponent } from './sms-editor.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

describe('SmsEditorComponent', () => {
  let component: SmsEditorComponent;
  let fixture: ComponentFixture<SmsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsEditorComponent ],
      imports: [ TranslateModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
