import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabItemViewComponent } from './tab-item-view.component';
import { TranslateModule } from '@ngx-translate/core';

describe('TabItemViewComponent', () => {
    let component: TabItemViewComponent;
    let fixture: ComponentFixture<TabItemViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TabItemViewComponent],
          imports: [
            TranslateModule.forRoot(),
          ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TabItemViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
