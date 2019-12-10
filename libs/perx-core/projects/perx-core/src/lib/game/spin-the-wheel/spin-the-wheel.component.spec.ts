import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SpinTheWheelComponent } from './spin-the-wheel.component';
import { SimpleChange } from '@angular/core';
import { ISlice } from '../game.model';

describe('SpinTheWheelComponent', () => {
  let component: SpinTheWheelComponent;
  let fixture: ComponentFixture<SpinTheWheelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinTheWheelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinTheWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnChanges', fakeAsync(() => {
    // else flow
    component.ngOnChanges({
      wheelImg: {} as SimpleChange,
      pointerImg: {} as SimpleChange
    });
    component.slices = [{
      id: '1',
      backgroundImage: 'image.img'
    } as ISlice]
    component.ngOnChanges({
      slices: {} as SimpleChange,
      wheelImg: {} as SimpleChange,
      pointerImg: {} as SimpleChange
    });
    tick();
    expect(component.size).toBeTruthy();
  }));

  it('ngAfterViewInit', ()=>{
    component.ngAfterViewInit();
    expect(component.size).toBeTruthy();
  });
});
