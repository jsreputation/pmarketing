import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsComponent } from './charts.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule } from '@angular/material';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsComponent],
      imports: [RouterTestingModule, MatTabsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
