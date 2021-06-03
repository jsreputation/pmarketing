import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointConversionComponent } from './point-conversion.component';

describe('PointConversionComponent', () => {
  let component: PointConversionComponent;
  let fixture: ComponentFixture<PointConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointConversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
