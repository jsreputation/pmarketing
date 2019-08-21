import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogsComponent } from './catalogs.component';
import { MatIconModule, MatCardModule } from '@angular/material';
import { RewardsService } from '@perx/core';
import { of } from 'rxjs';
import { catalogs } from 'src/app/catalogs.mock';

describe('CatalogsComponent', () => {
  let component: CatalogsComponent;
  let fixture: ComponentFixture<CatalogsComponent>;
  const catalogsServiceStub = {
    getAllCatalogs: () => of(catalogs)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogsComponent ],
      imports: [
        MatIconModule,
        MatCardModule
      ],
      providers: [
        { provide: RewardsService, useValue: catalogsServiceStub }
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
