import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselItemsComponent } from './carousel-items.component';
import { MatIconModule } from '@angular/material/icon';

describe('CarouselItemsComponent', () => {
  let component: CarouselItemsComponent;
  let fixture: ComponentFixture<CarouselItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselItemsComponent ],
      imports: [
        MatIconModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
