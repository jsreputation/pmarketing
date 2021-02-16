import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderboardCTAComponent } from './leaderboard-cta.component';

describe('NotificationService', () => {
    let component: LeaderboardCTAComponent;
    let fixture: ComponentFixture<LeaderboardCTAComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(LeaderboardCTAComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
