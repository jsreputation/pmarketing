import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGraphicWrapComponent } from './select-graphic-wrap.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesPreviewModule } from '../images-preview/images-preview.module';
import { UploadGraphicModule } from '../upload-graphic/upload-graphic.module';
import { SelectGraphicModule } from '../select-graphic/select-graphic.module';

describe('SelectGraphicWrapComponent', () => {
  let component: SelectGraphicWrapComponent;
  let fixture: ComponentFixture<SelectGraphicWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ImagesPreviewModule,
        UploadGraphicModule,
        SelectGraphicModule,
        ReactiveFormsModule,
      ],
      declarations: [ SelectGraphicWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGraphicWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
