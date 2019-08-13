import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleListComponent } from './puzzle-list.component';
import { MatCardModule, MatRippleModule } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EnvConfig } from '../../shared/env-config';
import { StampService } from '../../stamp/stamp.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
        HttpClientTestingModule
      ],
      providers: [
        EnvConfig,
        { provide: StampService, useValue: stampServiceMock }
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
