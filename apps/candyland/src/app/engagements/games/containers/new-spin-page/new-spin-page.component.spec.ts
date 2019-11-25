import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSpinPageComponent } from './new-spin-page.component';

describe('NewSpinPageComponent', () => {
  let component: NewSpinPageComponent;
  let fixture: ComponentFixture<NewSpinPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSpinPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSpinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
