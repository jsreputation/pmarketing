import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementTypeComponent } from './engagement-type.component';
import { TypeItemComponent } from './type-item/type-item.component';
import { MatDialogModule, MatFormFieldModule, MatIconModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { InkModule } from '../../../components/ink/ink.module';
import { ButtonModule } from '@perxtech/candyshop';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('EngagementTypeComponent', () => {
  let component: EngagementTypeComponent;
  let fixture: ComponentFixture<EngagementTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatDialogModule,
        MatIconModule,
        InkModule,
        MatFormFieldModule,
        MatSelectModule,
        ButtonModule,
        MatRadioModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        EngagementTypeComponent,
        TypeItemComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
