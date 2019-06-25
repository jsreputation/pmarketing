import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStampComponent } from './new-stamp.component';

describe('NewStampPageComponent', () => {
  let component: NewStampComponent;
  let fixture: ComponentFixture<NewStampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
