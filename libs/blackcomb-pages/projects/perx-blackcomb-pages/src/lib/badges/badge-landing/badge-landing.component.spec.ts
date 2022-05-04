import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeService } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { of } from 'rxjs';
import { BadgeListComponent } from '../badge-list/badge-list.component';
import { BadgeLandingComponent } from './badge-landing.component';
import { DebugElement } from '@angular/core';

describe('BadgeLandingComponent', () => {
    let component: BadgeLandingComponent;
    let fixture: ComponentFixture<BadgeLandingComponent>;

    const activatedRouteStub: Partial<ActivatedRoute> = {
        queryParams: of()
    };

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
                { provide: BadgeService, useValue: { getBadgesByState: () => of(), getAllBadges: () => of() } },
                { provide: ActivatedRoute, useValue: activatedRouteStub }
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


    it('should display 3 visible tabs in the badge landing page', () => {
      const allTabsLabel = [ 'BADGES.ALL_TAB', 'BADGES.EARNED_TAB', 'BADGES.UNEARNED_TAB' ];
      const listElmFind: string[] = [];
      const findElmByClass = fixture.debugElement.queryAll(By.css('.mat-tab-label-content'));
      findElmByClass.forEach((elm: DebugElement) => {
        if (elm) {
          listElmFind.push(elm.nativeElement.textContent);
        }
      });

      const isEqualAllLabel = allTabsLabel.every((label: string, index: number) => listElmFind[index] === label);
      expect(isEqualAllLabel).toBeTruthy();
    });
});

