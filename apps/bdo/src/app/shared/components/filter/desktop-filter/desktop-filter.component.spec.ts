import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxGroupComponent } from '../checkbox-group/checkbox-group.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RewardsService } from '@perxtech/core';
import { FilterService } from '../../../services/filter.service';
import { of } from 'rxjs';
import { DesktopFilterComponent } from './desktop-filter.component';
import { RouterTestingModule } from '@angular/router/testing';

class MockRewardService {
  getAllCategories() {
    return of();
  }
}

describe('DesktopFilterComponent', () => {
  let component: DesktopFilterComponent;
  let fixture: ComponentFixture<DesktopFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DesktopFilterComponent,
        CheckboxGroupComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        FilterService,
      	{ provide: RewardsService, useClass: MockRewardService},
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
