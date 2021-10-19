
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FilterService } from '../../shared/services/filter.service';

class MockRewardService {
  getAllCategories() {
    return of();
  }
}
describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

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
      	{ provide: RewardsService, useClass:MockRewardService}]
        FilterService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
