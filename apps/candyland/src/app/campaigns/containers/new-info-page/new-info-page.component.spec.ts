import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInfoPageComponent } from './new-info-page.component';

describe('NewInfoPageComponent', () => {
  let component: NewInfoPageComponent;
  let fixture: ComponentFixture<NewInfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewInfoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
