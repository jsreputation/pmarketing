import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratsComponent } from './congrats.component';
import { HeaderComponent } from '../header/header.component';
import { MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('CongratsComponent', () => {
  let component: CongratsComponent;
  let fixture: ComponentFixture<CongratsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CongratsComponent, HeaderComponent],
      imports: [
        MatToolbarModule,
        RouterTestingModule
      ]
    }).compileComponents();
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
