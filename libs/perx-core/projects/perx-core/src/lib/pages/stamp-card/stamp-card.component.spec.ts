import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StampCardComponent } from './stamp-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PuzzlesModule } from '../../puzzles/puzzles.module';
import { StampService } from '../../stamp/stamp.service';

describe('StampCardComponent', () => {
  let component: StampCardComponent;
  let fixture: ComponentFixture<StampCardComponent>;

  const stampServiceStub = {
    getCurrentCard: () => { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StampCardComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ]),
        PuzzlesModule
      ],
      providers: [
        { provide: StampService, useValue: stampServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
