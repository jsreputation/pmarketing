import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclePieChartComponent } from './circle-pie-chart.component';

describe('CirclePieChartComponent', () => {
    let component: CirclePieChartComponent;
    let fixture: ComponentFixture<CirclePieChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CirclePieChartComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CirclePieChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
