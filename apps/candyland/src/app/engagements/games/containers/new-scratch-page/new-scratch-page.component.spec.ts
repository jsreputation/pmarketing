import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScratchPageComponent } from './new-scratch-page.component';

describe('NewScratchComponent', () => {
  let component: NewScratchPageComponent;
  let fixture: ComponentFixture<NewScratchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewScratchPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScratchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
