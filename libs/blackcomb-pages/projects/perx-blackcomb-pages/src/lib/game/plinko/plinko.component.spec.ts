import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameModule} from '@perxtech/core';

import { PlinkoComponent } from './plinko.component';

describe('PlinkoComponent', () => {
  let component: PlinkoComponent;
  let fixture: ComponentFixture<PlinkoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GameModule],
      declarations: [ PlinkoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlinkoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
