import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LocationLandingComponent } from './location-landing.component';


describe('LocationLandingComponent', () => {
  let component: LocationLandingComponent;
  let fixture: ComponentFixture<LocationLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationLandingComponent],
      imports: [],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of([{ rid: 123 }]),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
