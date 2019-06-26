import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStampDisplayPageComponent } from './new-stamp-display-page.component';

describe('NewStampDisplayPageComponent', () => {
  let component: NewStampDisplayPageComponent;
  let fixture: ComponentFixture<NewStampDisplayPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStampDisplayPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStampDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
