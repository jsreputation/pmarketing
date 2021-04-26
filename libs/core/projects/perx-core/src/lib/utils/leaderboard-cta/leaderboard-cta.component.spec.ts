import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService, IRankService, SettingsService } from '@perxtech/core';
import { of } from 'rxjs';
import { LeaderboardCTAComponent } from './leaderboard-cta.component';

describe('LeaderboardCTAComponent', () => {
    let component: LeaderboardCTAComponent;
    let fixture: ComponentFixture<LeaderboardCTAComponent>;
    const configServiceStub: Partial<ConfigService> = {
        readAppConfig: () => of({
            apiHost: '',
            production: false,
            preAuth: false,
            isWhistler: false,
            baseHref: '',
        })
    };
    const router = {
        navigate: jest.fn()
    };

    const rankServiceStub: Partial<IRankService> = {
        getLeaderBoards: () => of(),
        getLeaderBoardsByCampaignID: () => of()
    };

    const settingsServiceStub: Partial<SettingsService> = {
        getRssFeeds: () => of(),
        getRemoteFlagsSettings: () => of()
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LeaderboardCTAComponent],
            imports: [
                MatToolbarModule,
                MatIconModule
            ],
            providers: [
                { provide: ConfigService, useValue: configServiceStub },
                { provide: TranslateService, useValue: { get: () => of() } },
                { provide: Router, useValue: router },
                { provide: IRankService, useValue: rankServiceStub },
                { provide: SettingsService, useValue: settingsServiceStub },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LeaderboardCTAComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
