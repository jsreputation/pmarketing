import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatIconModule} from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import {UploadGraphicExtComponent} from '@cl-shared/components/upload-graphi-plus-ext/upload-graphi-plus-ext.component';

describe('DownloadButtonComponent', () => {
  let component: UploadGraphicExtComponent ;
  let fixture: ComponentFixture<UploadGraphicExtComponent >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ UploadGraphicExtComponent  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGraphicExtComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
