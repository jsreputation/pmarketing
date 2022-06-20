import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonOverlayComponent } from './action-button-overlay.component';

describe('ActionButtonOverlayComponent', () => {
  let component: ActionButtonOverlayComponent;
  let fixture: ComponentFixture<ActionButtonOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionButtonOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
