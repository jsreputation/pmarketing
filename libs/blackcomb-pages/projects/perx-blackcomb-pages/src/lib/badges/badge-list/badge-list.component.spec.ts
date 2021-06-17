import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { BadgeListComponent } from './badge-list.component';

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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
