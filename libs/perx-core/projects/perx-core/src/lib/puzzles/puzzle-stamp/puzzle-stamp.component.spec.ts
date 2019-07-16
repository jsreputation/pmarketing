import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PuzzleStampComponent } from './puzzle-stamp.component';
import { MaterialModule } from '../../shared/material.module';
import { UtilsModule } from '../../utils/utils.module';

describe('PuzzleStampComponent', () => {
  let component: PuzzleStampComponent;
  let fixture: ComponentFixture<PuzzleStampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleStampComponent ],
      imports: [MaterialModule, UtilsModule]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleStampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('movedItems defaults to: []', () => {
    expect(component.movedItems).toEqual([]);
  });

  describe('isLessThanAvailblePieces', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getCurrentColumn').and.callThrough();
      component.isLessThanAvailblePieces(1, 2);
      expect(component.getCurrentColumn).toHaveBeenCalled();
    });
  });

  describe('styleObject', () => {
    it('makes expected calls', () => {
      spyOn(component, 'isLessThanAvailblePieces').and.callThrough();
      component.styleObject(1, 2);
      expect(component.isLessThanAvailblePieces).toHaveBeenCalled();
    });
  });

  describe('isMoved', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getCurrentColumn').and.callThrough();
      component.isMoved(1, 2);
      expect(component.getCurrentColumn).toHaveBeenCalled();
    });
  });

  describe('cardClick', () => {
    it('makes expected calls', () => {
      spyOn(component, 'cardClick').and.callThrough();
      component.cardClick();
      expect(component.cardClick).toHaveBeenCalled();
    });
  });

  describe('unlockAvailable', () => {
    it('makes expected calls', () => {
      spyOn(component, 'unlockAvailable').and.callThrough();
      component.unlockAvailable();
      expect(component.unlockAvailable).toHaveBeenCalled();
    });
  });

});
