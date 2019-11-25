import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinataComponent } from './pinata.component';

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
    component.enabled = false;
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

  it('should break', (done: DoneFn) => {
    const taps = 3;
    component.broken
      .subscribe(
        () => {
          expect(true).toBeTruthy();
          done();
        }
      );
    component.enabled = true;
    component.nbTaps = taps;
    for (let i = 0; i < taps * 2; i++) {
      component.shake();
    }
  });

  it('should reset', ()=>{
    component.stillImg = '';
    component.reset();
    expect(component.currentImg).toBe('');
  });

  it('should handle ngOnChanges', ()=>{
    const change = {openedImg: {previousValue: '', currentValue: 'img', firstChange: true, isFirstChange: ()=>true}};
     // @ts-ignore
    component.movingImg = undefined;
    component.ngOnChanges({})
    component.ngOnChanges(change);
    component.shake();
    component.nbTaps = 3;
    component.movingImg = 'img.move';
    component.shake();
    expect(component.currentImg).toBe('img.move'); // test for shake
    component.nbTaps = 1;
    component.ngOnChanges(change);
    component.nbTaps = 3;
    // @ts-ignore
    component.movingImg = undefined;
    component.ngOnChanges(change);
    component.movingImg = 'img.move';
    component.ngOnChanges(change);
    expect(component.currentImg).toBe('img.move'); // test for ngOnChanges
  });
});
