import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsMapComponent } from './locations-map.component';
import { MatCardModule, MatIconModule } from '@angular/material';

describe('LocationsMapComponent', () => {
  let component: LocationsMapComponent;
  let fixture: ComponentFixture<LocationsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsMapComponent],
      imports: [MatCardModule, MatIconModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
