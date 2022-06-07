import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import {
  TranslateModule,
} from '@ngx-translate/core';

import { EnrollGameButtonComponent } from './enroll-game-button.component';

describe('EnrollGameButtonComponent', () => {
  let component: EnrollGameButtonComponent;
  let fixture: ComponentFixture<EnrollGameButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollGameButtonComponent],
      imports: [
        MatIconModule,
        TranslateModule.forRoot(),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollGameButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
