import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShakePageComponent } from './new-shake-page.component';

describe('NewShakePageComponent', () => {
  let component: NewShakePageComponent;
  let fixture: ComponentFixture<NewShakePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewShakePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShakePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
