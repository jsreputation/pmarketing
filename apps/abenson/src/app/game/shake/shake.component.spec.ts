import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShakeComponent } from './shake.component';
import { GameModule } from '@perx/core';

describe('ShakeComponent', () => {
  let component: ShakeComponent;
  let fixture: ComponentFixture<ShakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShakeComponent],
      imports: [
        GameModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
