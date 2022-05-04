import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrimaryCatalogComponent } from './primary-catalog.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PrimaryCatalogComponent', () => {
  let component: PrimaryCatalogComponent;
  let fixture: ComponentFixture<PrimaryCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryCatalogComponent ],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
