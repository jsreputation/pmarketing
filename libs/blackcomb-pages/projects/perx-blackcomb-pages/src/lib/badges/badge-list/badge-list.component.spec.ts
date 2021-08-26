import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { BadgeListComponent } from './badge-list.component';
import { By } from '@angular/platform-browser';
import { IBadge } from '@perxtech/core';

const badgesMock = [
  {
    id: 13,
    active: true,
    title: 'Test title',
    description: 'Test description',
    image: {
      type: 'image',
      value: {
        file: 'image',
        filename: 'image',
        image_id: 12,
        image_url: 'image',
      },
    }
  },
  {
    id: 3,
    active: false,
    title: 'Test title 2',
    description: 'Test description 2',
    image: {
      type: 'image',
      value: {
        file: 'image',
        filename: 'image',
        image_id: 112,
        image_url: 'image',
      },
    }
  }
];

describe('BadgeListComponent', () => {
    let component: BadgeListComponent;
    let fixture: ComponentFixture<BadgeListComponent>;

    beforeEach(async(() => {
        const router = {
            navigate: jest.fn()
        };

        TestBed.configureTestingModule({
            declarations: [BadgeListComponent],
            imports: [
                MatDialogModule,
                TranslateModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: {} },
                { provide: MAT_DIALOG_DATA, useValue: [] },
                {
                    provide: TranslateService, useValue: { getTranslation: () => of() }
                },
                { provide: Router, useValue: router }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BadgeListComponent);
        component = fixture.componentInstance;
        component.badges = badgesMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should Active badges will have the tenants primary color as the background', () => {
        const listBadgeElm = fixture.debugElement.queryAll(By.css('.badge'));
        const { badges } = component;
        const badgeActiveIndex = badges.findIndex((badge: IBadge) => badge.active);
        expect(listBadgeElm[badgeActiveIndex].classes.disabled).toBeFalsy();
    });

});
