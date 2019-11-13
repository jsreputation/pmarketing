import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLineProgressComponent } from './custom-line-progress.component';

describe('CustomLineProgressComponent', () => {
  let component: CustomLineProgressComponent;
  let fixture: ComponentFixture<CustomLineProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomLineProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLineProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
