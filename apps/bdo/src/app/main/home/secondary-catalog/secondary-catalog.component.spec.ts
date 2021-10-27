import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SecondaryCatalogComponent } from './secondary-catalog.component';

describe('SecondaryCatalogComponent', () => {
  let component: SecondaryCatalogComponent;
  let fixture: ComponentFixture<SecondaryCatalogComponent>;
  const routerBdo: Partial<Router> = {
    navigate: () => Promise.resolve(true)
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryCatalogComponent ],
       providers:[ {provide: Router, useValue:routerBdo}]
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
