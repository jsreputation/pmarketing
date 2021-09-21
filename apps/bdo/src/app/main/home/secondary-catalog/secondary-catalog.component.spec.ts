import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecondaryCatalogComponent } from './secondary-catalog.component';

describe('SecondaryCatalogComponent', () => {
  let component: SecondaryCatalogComponent;
  let fixture: ComponentFixture<SecondaryCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
