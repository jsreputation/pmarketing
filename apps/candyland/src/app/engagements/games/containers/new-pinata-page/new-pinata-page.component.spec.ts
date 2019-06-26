import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPinataPageComponent } from './new-pinata-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewPinataPageComponent', () => {
  let component: NewPinataPageComponent;
  let fixture: ComponentFixture<NewPinataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ NewPinataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPinataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
