import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleListComponent } from './puzzle-list.component';
import { MatCardModule, MatRippleModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EnvConfig } from '../../shared/env-config';
import { V4StampService } from '../../stamp/v4-stamp.service';

describe('PuzzleListComponent', () => {
  let component: PuzzleListComponent;
  let fixture: ComponentFixture<PuzzleListComponent>;
  const stampServiceMock = jasmine.createSpyObj('StampService', ['']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzleListComponent],
      imports: [
        MatCardModule,
        MatRippleModule,
        HttpClientModule
      ],
      providers: [
        EnvConfig,
        { provide: V4StampService, useValue: stampServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
