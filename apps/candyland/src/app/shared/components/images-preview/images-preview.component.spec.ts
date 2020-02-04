import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesPreviewComponent } from './images-preview.component';
import {DialogPreviewSelectorModule} from '@cl-shared/components/dialog-preview-selector/dialog-preview-selector.module';
import {MatIconModule} from '@angular/material';

describe('ImagesPreviewComponent', () => {
  let component: ImagesPreviewComponent;
  let fixture: ComponentFixture<ImagesPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesPreviewComponent ],
      imports: [
        DialogPreviewSelectorModule,
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
