import { MatIconModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleCollectStampsComponent } from './puzzle-collect-stamps.component';
import { IStamp, StampState } from '../../stamp/models/stamp.model';

describe('PuzzleCollectStampsComponent', () => {
  let component: PuzzleCollectStampsComponent;
  let fixture: ComponentFixture<PuzzleCollectStampsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzleCollectStampsComponent],
      imports: [MatIconModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleCollectStampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter stamp', () => {
    component.stamps = null;
    component.ngOnInit();
    component.stamps = [{ state: StampState.issued } as IStamp];
    component.ngOnInit();
    expect(component.stamps).toBeTruthy();
  });

  it('ngOnChanges', () => {
    component.ngOnChanges({});
    component.nbSlots = 3;
    component.numberOfCols = 3;
    component.stamps = [{ state: StampState.issued } as IStamp];
    component.ngOnChanges({
      nbSlots: 4,
      stamps: { state: StampState.issued } as IStamp
    } as any);
    expect(component.currentActiveOrientation && component.currentActiveOrientation[0]).toBe(3);
  });
});
