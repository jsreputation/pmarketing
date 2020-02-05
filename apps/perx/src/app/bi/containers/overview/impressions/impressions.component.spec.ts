import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionsComponent } from './impressions.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';

describe('ImpressionsComponent', () => {
  let component: ImpressionsComponent;
  let fixture: ComponentFixture<ImpressionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImpressionsComponent],
      imports: [UnderConstructionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
