import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LocationShortFormatComponent } from './location-short-format.component';

describe('LocationShortFormatComponent', () => {
  let component: LocationShortFormatComponent;
  let fixture: ComponentFixture<LocationShortFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationShortFormatComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationShortFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
