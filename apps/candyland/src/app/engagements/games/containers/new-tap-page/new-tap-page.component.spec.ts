import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTapPageComponent } from './new-tap-page.component';

describe('NewTapPageComponent', () => {
  let component: NewTapPageComponent;
  let fixture: ComponentFixture<NewTapPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTapPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
