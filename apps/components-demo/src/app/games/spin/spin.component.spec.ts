import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinComponent } from './spin.component';
import { GameModule } from '@perx/core';

describe('SpinComponent', () => {
  let component: SpinComponent;
  let fixture: ComponentFixture<SpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinComponent ],
      imports: [ GameModule ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
