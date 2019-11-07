import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCardComponent } from './chart-card.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChartCardComponent', () => {
    let component: ChartCardComponent;
    let fixture: ComponentFixture<ChartCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChartCardComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChartCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
