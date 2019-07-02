import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementTypeComponent } from './engagement-type.component';
import { TypeItemComponent } from './type-item/type-item.component';
import { MatDialogModule, MatFormFieldModule, MatIconModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { InkModule } from '@cl-shared/components/ink/ink.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InkComponent } from '@cl-shared/components/ink/ink.component';
import { InkBarDirective } from '@cl-shared/components/ink/directives/ink-bar.directive';
import { InkHostDirective } from '@cl-shared/components/ink/directives/ink-host.directive';
import { InkListenerDirective } from '@cl-shared/components/ink/directives/ink-listener.directive';

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
