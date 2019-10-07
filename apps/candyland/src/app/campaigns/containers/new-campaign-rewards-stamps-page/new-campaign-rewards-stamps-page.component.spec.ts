import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignRewardsStampsPageComponent } from './new-campaign-rewards-stamps-page.component';

describe('NewCampaignRewardsStampsPageComponent', () => {
    let component: NewCampaignRewardsStampsPageComponent;
    let fixture: ComponentFixture<NewCampaignRewardsStampsPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewCampaignRewardsStampsPageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewCampaignRewardsStampsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});