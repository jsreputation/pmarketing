import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTapDisplayPageComponent } from './new-tap-display-page.component';

describe('NewTapDisplayPageComponent', () => {
  let component: NewTapDisplayPageComponent;
  let fixture: ComponentFixture<NewTapDisplayPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTapDisplayPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTapDisplayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
