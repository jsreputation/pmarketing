import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSelectGraphicWrapComponent } from './test-select-graphic-wrap.component';

describe('TestSelectGraphicWrapComponent', () => {
  let component: TestSelectGraphicWrapComponent;
  let fixture: ComponentFixture<TestSelectGraphicWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSelectGraphicWrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSelectGraphicWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
