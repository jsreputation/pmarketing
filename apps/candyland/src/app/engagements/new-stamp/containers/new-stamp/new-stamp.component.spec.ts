import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStampComponent } from './new-stamp.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewStampPageComponent', () => {
  let component: NewStampComponent;
  let fixture: ComponentFixture<NewStampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ NewStampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
