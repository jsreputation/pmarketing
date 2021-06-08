import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeService } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { of } from 'rxjs';
import { BadgeListComponent } from '../badge-list/badge-list.component';
import { BadgeLandingComponent } from './badge-landing.component';

describe('BadgeLandingComponent', () => {
    let component: BadgeLandingComponent;
    let fixture: ComponentFixture<BadgeLandingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BadgeLandingComponent, BadgeListComponent],
            imports: [
                MatTabsModule,
                TranslateModule.forRoot(),
                InfiniteScrollModule,
                MatDialogModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: BadgeService, useValue: { getBadgesByState: () => of(), getAllBadges: () => of() } }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BadgeLandingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
