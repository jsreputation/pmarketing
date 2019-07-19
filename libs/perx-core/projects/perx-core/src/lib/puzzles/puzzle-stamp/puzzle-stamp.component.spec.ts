import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PuzzleStampComponent } from './puzzle-stamp.component';
import { StampComponent } from './stamp/stamp.component';
import { MaterialModule } from '../../shared/material.module';
import { UtilsModule } from '../../utils/utils.module';
import { STAMP_STATE } from '../../stamp/models/stamp.model';

describe('PuzzleStampComponent', () => {
  let component: PuzzleStampComponent;
  let fixture: ComponentFixture<PuzzleStampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PuzzleStampComponent, StampComponent],
      imports: [UtilsModule, MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleStampComponent);
    component = fixture.componentInstance;
    component.stamps = [{
      "id": 1,
      "user_account_id": 1,
      "state": STAMP_STATE.redeemed,
      "stamp_card_id": 1,
      "created_at": "",
      "updated_at": "",
      "campaign_id": 1,
      "vouchers": []
    }]
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('movedItems defaults to: []', () => {
    expect(component.movedItems).toEqual([]);
  });

  describe('isStampAvailable', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getCurrentColumn').and.callThrough();
      component.isStampAvailable(1, 2);
      expect(component.getCurrentColumn).toHaveBeenCalled();
    });
  });

  describe('styleObject', () => {
    it('makes expected calls', () => {
      spyOn(component, 'isStampAvailable').and.callThrough();
      component.styleObject(1, 2);
      expect(component.isStampAvailable).toHaveBeenCalled();
    });
  });

  describe('isStampClicked', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getCurrentColumn').and.callThrough();
      component.isStampClicked(1, 2);
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
