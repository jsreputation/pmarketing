import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMerchantFormComponent } from './create-merchant-form.component';



describe('CreateMerchantComponent', () => {
  let component: CreateMerchantFormComponent;
  let fixture: ComponentFixture<CreateMerchantFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMerchantFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMerchantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
