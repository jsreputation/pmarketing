import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandingComponent } from './branding.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';

describe('BrandingComponent', () => {
  let component: BrandingComponent;
  let fixture: ComponentFixture<BrandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BrandingComponent],
      imports:[UnderConstructionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
