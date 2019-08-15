import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsComponent } from './catalogs.component';
import { MatIconModule, MatCardModule } from '@angular/material';

describe('CatalogsComponent', () => {
  let component: CatalogsComponent;
  let fixture: ComponentFixture<CatalogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsComponent ],
      imports: [
        MatIconModule,
        MatCardModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
