import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiComponent } from './bi.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('BiComponent', () => {
  let component: BiComponent;
  let fixture: ComponentFixture<BiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BiComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
