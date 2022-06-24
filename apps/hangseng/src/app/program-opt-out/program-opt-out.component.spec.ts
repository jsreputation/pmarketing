import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramOptOutComponent } from './program-opt-out.component';

describe('ProgramOptOutComponent', () => {
  let component: ProgramOptOutComponent;
  let fixture: ComponentFixture<ProgramOptOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramOptOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramOptOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
