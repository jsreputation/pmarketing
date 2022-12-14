import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { StampComponent } from './stamp.component';
import { UtilsModule } from '../../../utils/utils.module';
import { StampState } from '../../../stamp/models/stamp.model';

describe('StampComponent', () => {
  let component: StampComponent;
  let fixture: ComponentFixture<StampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StampComponent],
      imports: [UtilsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should show locked image on ngOnInit', () => {
    component.lockImg = 'locked.png';
    component.ngOnInit();
    expect(component.lockImg).toBe('locked.png');
  });

  it('should show unlocked image on ngDoCheck', () => {
    component.isUnlockedAll = true;
    component.unlockImg = 'unlocked.png';
    component.ngDoCheck();
    expect(component.imageLock).toBe('unlocked.png');
  });

  it('should show unlocked image on changeLockImage Call', () => {
    component.isCurrent = true;
    component.unlockImg = 'unlocked.png';
    component.stamps = [
      {
        id: 1,
        userAccountId: 1,
        stampCardId: 1,
        state: StampState.issued,
        createdAt: '',
        updatedAt: '',
        campaignId: 1,
        vouchers: [],
      }
    ];
    component.stampColumn = 0;
    component.changeLockImage();
    expect(component.imageLock).toBe('unlocked.png');
  });

  it('should image be undefined on changeLockImage Call', () => {
    component.isCurrent = false;
    component.unlockImg = 'unlocked.png';
    component.changeLockImage();
    expect(component.imageLock).toBe(undefined);
  });

  it('should moveCard have been Call', () => {
    component.isCurrent = true;
    component.stamps = [
      {
        id: 1,
        userAccountId: 1,
        stampCardId: 1,
        state: StampState.issued,
        createdAt: '',
        updatedAt: '',
        campaignId: 1,
        vouchers: [],
      }
    ];
    component.stampColumn = 0;
    jest.spyOn(component.moveCard, 'emit').mockImplementation(() => {});
    component.onCardUnlock();
    expect(component.moveCard.emit).toHaveBeenCalled();
  });

  it('should unlock image if avilable is true', () => {
    component.available = true;
    component.unlockImg = 'unlocked.png';
    component.unlockAllAvailableCards();
    expect(component.imageLock).toBe('unlocked.png');
  });

});
