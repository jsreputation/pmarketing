import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsComponent } from './uploads.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';

describe('UploadsComponent', () => {
  let component: UploadsComponent;
  let fixture: ComponentFixture<UploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadsComponent],
      imports: [UnderConstructionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
