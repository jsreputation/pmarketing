import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScratchTheCardComponent } from './new-scratch-the-card.component';

describe('NewScratchTheCardComponent', () => {
  let component: NewScratchTheCardComponent;
  let fixture: ComponentFixture<NewScratchTheCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewScratchTheCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScratchTheCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
