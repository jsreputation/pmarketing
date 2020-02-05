import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsComponent } from './campaigns.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';

describe('CampaignsComponent', () => {
  let component: CampaignsComponent;
  let fixture: ComponentFixture<CampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignsComponent],
      imports: [UnderConstructionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
