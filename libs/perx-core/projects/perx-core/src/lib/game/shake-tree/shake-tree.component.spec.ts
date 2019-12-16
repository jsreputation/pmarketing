import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShakeTreeComponent } from './shake-tree.component';

describe('ShakeTreeComponent', () => {
  let component: ShakeTreeComponent;
  let fixture: ComponentFixture<ShakeTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShakeTreeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoul clear susbcriptions', () => {
    const spy = spyOn(component.tap, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should handle tapped', () => {
    // ngChanges called private method, what can not been checked
    component.ngOnChanges({
      nbHangedGifts: {
        previousValue: 1,
        currentValue: 2,
        firstChange: false,
        isFirstChange: () => false
      }
    });
    component.ngOnChanges({});
    component.shakeAnimationClass = 'test';
    component.enabled = false;
    component.tapped();
    expect(component.shakeAnimationClass).toBe('test');
    component.enabled = true;
    component.tapped();
    expect(component.shakeAnimationClass).toBe('');
  });

  it('should return ManStyle', () => {
    expect(component.getManStyle()).toEqual({ left: '16%', bottom: '5%' });
  });

  it('should handle reset', () => {
    component.shakeAnimationClass = 'test';
    component.reset();
    expect(component.shakeAnimationClass).toBe('');
  });
});
