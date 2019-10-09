import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsListPageComponent } from './campaigns-list-page.component';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TableFiltersModule } from '@cl-shared';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatFormFieldModule, MatSnackBarModule, MatInputModule, MatSelectModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CampaignsListPageComponent', () => {
    let component: CampaignsListPageComponent;
    let fixture: ComponentFixture<CampaignsListPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TableFiltersModule,
                BrowserDynamicTestingModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                HttpClientTestingModule,
                RouterTestingModule,
                MatSnackBarModule,
                BrowserAnimationsModule,
                NoopAnimationsModule
            ],
            declarations: [CampaignsListPageComponent],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CampaignsListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
