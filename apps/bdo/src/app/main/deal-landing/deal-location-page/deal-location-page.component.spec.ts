import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBadgeModule } from '@angular/material/badge';
import { FooterReferComponent } from '../../../shared/components/footer-refer/footer-refer.component';
import { DealLocationPageComponent } from './deal-location-page.component';



describe('TreatEnrollCompletePageComponent', () => {
  let component: DealLocationPageComponent;
  let fixture: ComponentFixture<DealLocationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealLocationPageComponent,FooterReferComponent],
      imports: [
        MatBadgeModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealLocationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
