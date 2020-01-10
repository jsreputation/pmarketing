import { async, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { ExpireTimerComponent } from './expire-timer.component';

describe('ExpireTimerComponent', () => {
  let component: ExpireTimerComponent;
  let fixture: ComponentFixture<ExpireTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpireTimerComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpireTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {
    it('should emit hasExpired with value true', () => {
      const dateNow = new Date();
      component.timerEndDate = dateNow;
      spyOn(component.hasExpired, 'emit');
      component.ngOnInit();
      expect(component.hasExpired.emit).toHaveBeenCalledWith(true);
    });

    it('should emit isExpiring with value true', fakeAsync(() => {
      const dateNow = new Date();
      component.timerEndDate = new Date(dateNow.setHours(dateNow.getHours() + 26));
      spyOn(component.isExpiring, 'emit');
      component.ngOnInit();
      tick(129600);
      fixture.detectChanges();
      discardPeriodicTasks();
      tick(129600);
      discardPeriodicTasks();
      expect(component.isExpiring.emit).toHaveBeenCalledWith(true);
    }));

    it('should NOT emit', fakeAsync(() => {
      const dateNow = new Date();
      component.timerEndDate = new Date(dateNow.setHours(dateNow.getHours() + 46));
      const isExpiringSpy = spyOn(component.isExpiring, 'emit');
      const hasExpiredSpy = spyOn(component.hasExpired, 'emit');
      component.ngOnInit();
      tick();
      expect(isExpiringSpy).not.toHaveBeenCalled();
      expect(hasExpiredSpy).not.toHaveBeenCalled();
    }));
  });
});
