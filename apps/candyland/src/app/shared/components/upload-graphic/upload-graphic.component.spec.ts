import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGraphicComponent } from './upload-graphic.component';

describe('UploadGraphicComponent', () => {
  let component: UploadGraphicComponent;
  let fixture: ComponentFixture<UploadGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
