
// import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RewardsService } from '@perxtech/core';
import { FilterService } from '../../services/filter.service';
import { of } from 'rxjs';

class MockRewardService {
  getAllCategories() {
    return of();
  }
}
describe('FilterComponent', () => {
  // let component: FilterComponent;
  // let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FilterComponent,
        CheckboxGroupComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatExpansionModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule
      ],
      providers: [
        FilterService,
      	{ provide: RewardsService, useClass:MockRewardService},
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // fixture = TestBed.createComponent(FilterComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
