import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipListComponent } from './chip-list.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('ChipListComponent', () => {
    let component: ChipListComponent;
    let fixture: ComponentFixture<ChipListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChipListComponent],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChipListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
