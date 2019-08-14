import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleListComponent } from './puzzle-list.component';
import { MatCardModule, MatRippleModule, MatIconModule } from '@angular/material';
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
        MatIconModule,
        HttpClientTestingModule
      ],
      providers: [
        EnvConfig,
        { provide: StampService, useValue: stampServiceMock }
      ],
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
