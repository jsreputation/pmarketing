import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TncComponent } from './tnc.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('TncComponent', () => {
  let component: TncComponent;
  let fixture: ComponentFixture<TncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TncComponent ],
      imports: [
        MatIconModule,
        MatToolbarModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
