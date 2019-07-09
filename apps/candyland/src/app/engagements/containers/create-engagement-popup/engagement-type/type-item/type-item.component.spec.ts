import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeItemComponent } from './type-item.component';
import { MatFormFieldModule, MatIconModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('TypeItemComponent', () => {
  let component: TypeItemComponent;
  let fixture: ComponentFixture<TypeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        ButtonModule,
        MatRadioModule,
        ReactiveFormsModule,
      ],
      declarations: [ TypeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeItemComponent);
    component = fixture.componentInstance;
    component.typeItem =   {
      id: 1,
      type: 'survey',
      title: 'Survey',
      img: 'assets/images/engagement-type/survey.svg',
      active: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
