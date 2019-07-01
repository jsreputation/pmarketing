import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PinInputComponent } from './pin-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VouchersModule } from '../vouchers/vouchers.module';
import { PinService } from './pin.service';

describe('PinInputComponent', () => {
  let component: PinInputComponent;
  let fixture: ComponentFixture<PinInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinInputComponent],
      imports: [
        VouchersModule.forRoot({ env: { apiHost: '' } }),
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [PinService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
