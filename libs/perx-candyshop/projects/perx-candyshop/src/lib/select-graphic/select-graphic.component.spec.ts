import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGraphicComponent } from './select-graphic.component';
import { ImagesPreviewModule } from '../images-preview/images-preview.module';
import { UploadGraphicModule } from '../upload-graphic/upload-graphic.module';

describe('SelectGraphicComponent', () => {
  let component: SelectGraphicComponent;
  let fixture: ComponentFixture<SelectGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ImagesPreviewModule,
        UploadGraphicModule,
      ],
      declarations: [ SelectGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
