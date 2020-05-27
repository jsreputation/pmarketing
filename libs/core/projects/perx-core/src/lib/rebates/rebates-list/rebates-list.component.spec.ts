import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule, MatRippleModule } from '@angular/material';
import { RebatesListComponent } from './rebates-list.component';

describe('RebatesListComponent', () => {
  let component: RebatesListComponent;
  let fixture: ComponentFixture<RebatesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RebatesListComponent],
      imports: [
        MatCardModule,
        MatRippleModule
      ],
      providers: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
