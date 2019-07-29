import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeGameComponent } from './shake-game.component';
import { HeaderComponent } from '../header/header.component';
import { GameModule } from '@perx/core';
import { MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('ShakeGameComponent', () => {
  let component: ShakeGameComponent;
  let fixture: ComponentFixture<ShakeGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShakeGameComponent, HeaderComponent ],
      imports: [GameModule, MatToolbarModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
