import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatToolbarModule } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '@perxtech/core';
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LeaderboardCTAComponent],
            imports: [
                MatToolbarModule,
                MatIconModule
            ],
            providers: [
                { provide: ConfigService, useValue: configServiceStub },
                { provide: TranslateService, useValue: { get: () => of() } }
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
