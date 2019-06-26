import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPinataDisplayPageComponent } from './new-pinata-display-page.component';

describe('NewPinataDisplayPageComponent', () => {
  let component: NewPinataDisplayPageComponent;
  let fixture: ComponentFixture<NewPinataDisplayPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPinataDisplayPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPinataDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
