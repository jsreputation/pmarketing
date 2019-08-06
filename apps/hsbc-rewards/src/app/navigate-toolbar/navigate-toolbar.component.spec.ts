import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateToolbarComponent } from './navigate-toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('NavigateToolbarComponent', () => {
  let component: NavigateToolbarComponent;
  let fixture: ComponentFixture<NavigateToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigateToolbarComponent],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigateToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
