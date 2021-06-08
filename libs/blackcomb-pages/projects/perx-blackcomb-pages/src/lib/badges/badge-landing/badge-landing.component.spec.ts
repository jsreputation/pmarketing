import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeServiceModule } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BadgeListComponent } from '../badge-list/badge-list.component';
import { BadgeLandingComponent } from './badge-landing.component';

describe('BadgeLandingComponent', () => {
    let component: BadgeLandingComponent;
    let fixture: ComponentFixture<BadgeLandingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BadgeLandingComponent, BadgeListComponent],
            imports: [
                MatDialogModule,
                MatTabsModule,
                TranslateModule.forRoot(),
                BrowserAnimationsModule,
                NoopAnimationsModule,
                InfiniteScrollModule,
                BadgeServiceModule.forRoot()
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] }
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
