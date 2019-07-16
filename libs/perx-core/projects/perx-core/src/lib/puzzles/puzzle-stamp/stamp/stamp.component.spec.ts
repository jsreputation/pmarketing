import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { StampComponent } from './stamp.component';
import { UtilsModule } from '../../../utils/utils.module';

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
    expect(component.imageLock).toBe('locked.png');
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
    component.available = true;
    spyOn(component.moveCard, 'emit');
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
