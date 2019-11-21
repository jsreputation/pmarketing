import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleLabelComponent } from './role-label.component';

describe('RoleLabelComponent', () => {
  let component: RoleLabelComponent;
  let fixture: ComponentFixture<RoleLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RoleLabelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
