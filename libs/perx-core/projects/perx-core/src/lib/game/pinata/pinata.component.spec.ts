import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinataComponent } from './pinata.component';
import { count } from 'rxjs/operators';

describe('PinataComponent', () => {
  let component: PinataComponent;
  let fixture: ComponentFixture<PinataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinataComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not shake if not enabled', () => {
    component.tap.subscribe(
      () => {
        expect(false).toBeTruthy('It should not shake');
      }
    );
    component.shake();
    expect(true).toBeTruthy('just for the sake of having one expectation');
  });

  it('should shake if enabled', (done: DoneFn) => {
    component.tap.subscribe(
      (tap: number) => {
        expect(tap).toBe(1);
        done();
      }
    );
    component.enabled = true;
    component.shake();
  });

  it('should shake only n times', (done: DoneFn) => {
    const taps = 3;
    component.tap.
      pipe(
        count()
      ).subscribe(
        (total: number) => {
          expect(total).toBe(taps);
          done();
        }
      );
    component.enabled = true;
    component.nbTaps = taps;
    for (let i = 0; i < taps * 2; i++) {
      component.shake();
    }
  });

  it('should break only 1 time', (done: DoneFn) => {
    const taps = 3;
    component.broken.
      pipe(
        count()
      ).subscribe(
        (total: number) => {
          expect(total).toBe(1);
          done();
        }
      );
    component.enabled = true;
    component.nbTaps = taps;
    for (let i = 0; i < taps * 2; i++) {
      component.shake();
    }
  });
});
