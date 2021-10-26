import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterReferComponent } from './footer-refer.component';



describe('TreatEnrollCompletePageComponent', () => {
  let component: FooterReferComponent;
  let fixture: ComponentFixture<FooterReferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterReferComponent],
      imports: [
        
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterReferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
