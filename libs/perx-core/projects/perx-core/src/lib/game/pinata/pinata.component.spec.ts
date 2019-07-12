import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinataComponent } from './pinata.component';

describe('PinataComponent', () => {
  let component: PinataComponent;
  let fixture: ComponentFixture<PinataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
