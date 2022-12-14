import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeComponent } from './snake.component';
import { SnakeGameComponent } from '@perxtech/core';

describe('SnakeComponent', () => {
  let component: SnakeComponent;
  let fixture: ComponentFixture<SnakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SnakeComponent,
        SnakeGameComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
