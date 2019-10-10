import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementsListPageComponent } from './engagements-list-page.component';
// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TableFiltersModule } from '@cl-shared';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material';

describe('EngagementsListPageComponent', () => {
    let component: EngagementsListPageComponent;
    let fixture: ComponentFixture<EngagementsListPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TableFiltersModule,
                HttpClientTestingModule,
                RouterTestingModule,
                MatDialogModule
            ],
            providers: [
                { provide: MatDialogRef, useValue: { close: () => {} } }
            ],
            declarations: [EngagementsListPageComponent],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EngagementsListPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
