import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTapPageComponent } from './new-tap-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewTapPageComponent', () => {
  let component: NewTapPageComponent;
  let fixture: ComponentFixture<NewTapPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ NewTapPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTapPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
