import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CampaignStampsReadMoreComponent } from './campaign-stamps-read-more.component';

describe('CampaignStampsReadMoreComponent', () => {
  let component: CampaignStampsReadMoreComponent;
  let fixture: ComponentFixture<CampaignStampsReadMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignStampsReadMoreComponent ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignStampsReadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
