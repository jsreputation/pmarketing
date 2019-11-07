import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleMobileViewComponent } from './simple-mobile-view.component';

describe('SimpleMobileViewComponent', () => {
  let component: SimpleMobileViewComponent;
  let fixture: ComponentFixture<SimpleMobileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleMobileViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleMobileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
