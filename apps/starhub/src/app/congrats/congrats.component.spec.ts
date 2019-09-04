import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatToolbarModule,
  MatCardModule,
} from '@angular/material';

import { CongratsComponent } from './congrats.component';
import { Router } from '@angular/router';

describe('CongratsComponent', () => {
  let component: CongratsComponent;
  let fixture: ComponentFixture<CongratsComponent>;
  const routerStub = { navigate: () => ({}) };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongratsComponent ],
      imports: [ MatToolbarModule, MatCardModule ],
      providers: [
        { provide: Router, useValue: routerStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
