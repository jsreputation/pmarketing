import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramMainImageComponent } from './program-main-image.component';

describe('ProgramMainImageComponent', () => {
  let component: ProgramMainImageComponent;
  let fixture: ComponentFixture<ProgramMainImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramMainImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramMainImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
