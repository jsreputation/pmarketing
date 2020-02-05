import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguesComponent } from './catalogues.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CataloguesComponent', () => {
  let component: CataloguesComponent;
  let fixture: ComponentFixture<CataloguesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CataloguesComponent],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CataloguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
