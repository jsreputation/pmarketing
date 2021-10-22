import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SecondaryCatalogComponent } from './secondary-catalog.component';
class MockRouter {
  navigate() {}
}
describe('SecondaryCatalogComponent', () => {
  let component: SecondaryCatalogComponent;
  let fixture: ComponentFixture<SecondaryCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondaryCatalogComponent ],
       providers:[ {provide: Router, useClass: MockRouter}]
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
