import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinInputComponent } from './pin-input.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('PinInputComponent', () => {
  let component: PinInputComponent;
  let fixture: ComponentFixture<PinInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinInputComponent],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
