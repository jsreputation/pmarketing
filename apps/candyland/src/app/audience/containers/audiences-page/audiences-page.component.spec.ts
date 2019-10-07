import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiencesPageComponent } from './audiences-page.component';
import { SettingsService, AudiencesService, AuthService } from '@cl-core-services';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { ButtonModule, PaginationModule, TableFiltersModule, SearchFilterModule, NoDataModule, StatusLabelModule } from '@cl-shared';
import {TabsFilterModule} from '../../../shared/table/tabs-filter/tabs-filter.module';
import { MatIconModule, MatTableModule, MatSortModule, MatTabsModule, MatMenuModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { AudiencesListComponent } from '../../components/audiences-list/audiences-list.component';
import { AudiencesUsersListComponent } from '../../components/audiences-users-list/audiences-users-list.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AudiencesPageComponent', () => {
    let component: AudiencesPageComponent;
    let fixture: ComponentFixture<AudiencesPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ButtonModule,
                MatIconModule,
                MatTableModule,
                MatSortModule,
                PaginationModule,
                TableFiltersModule,
                SearchFilterModule,
                BrowserDynamicTestingModule,
                HttpClientTestingModule,
                TabsFilterModule,
                MatTabsModule,
                MatIconModule,
                MatMenuModule,
                FormsModule,
                ReactiveFormsModule,
                NoDataModule,
                StatusLabelModule,
                RouterTestingModule,
                MatDialogModule,
                MatSnackBarModule,
                BrowserAnimationsModule,
                NoopAnimationsModule
            ],
            providers: [
                SettingsService,
                AudiencesService,
                AudiencesUserService,
                LocalStorageService,
                AuthService
            ],
            declarations: [
                AudiencesPageComponent,
                AudiencesListComponent,
                AudiencesUsersListComponent

            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AudiencesPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
