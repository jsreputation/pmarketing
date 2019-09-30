import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeExpiryDatePopupComponent } from './change-expiry-date-popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatIconModule, MatDatepickerModule } from '@angular/material';
import { DatePickerModule, ButtonModule } from '@cl-shared';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ChangeExpiryDatePopupComponent', () => {
    let component: ChangeExpiryDatePopupComponent;
    let fixture: ComponentFixture<ChangeExpiryDatePopupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                MatDialogModule,
                DatePickerModule,
                ButtonModule,
                MatIconModule,
                BrowserDynamicTestingModule,
                MatDatepickerModule,
                FormsModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                NoopAnimationsModule
              ],
            providers: [
                {
                    provide: MatDialogRef, useValue: {
                    close: () => {
                    }
                },
                },
                { provide: MAT_DIALOG_DATA, useValue: {} },
            ],
            declarations: [ChangeExpiryDatePopupComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeExpiryDatePopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});