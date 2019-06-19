import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawComponent } from './draw.component';
import { PerxCoreModule } from '@perx/core/dist/perx-core';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material';

describe('DrawComponent', () => {
  let component: DrawComponent;
  let fixture: ComponentFixture<DrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawComponent],
      imports: [
        PerxCoreModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
