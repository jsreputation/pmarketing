import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUploadGraphicComponent } from './test-upload-graphic.component';

describe('TestUploadGraphicComponent', () => {
  let component: TestUploadGraphicComponent;
  let fixture: ComponentFixture<TestUploadGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestUploadGraphicComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestUploadGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
