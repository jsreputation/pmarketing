import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UploadGraphicComponent} from './upload-graphic.component';
import {MatIconModule} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('DownloadButtonComponent', () => {
  let component: UploadGraphicComponent;
  let fixture: ComponentFixture<UploadGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ UploadGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
