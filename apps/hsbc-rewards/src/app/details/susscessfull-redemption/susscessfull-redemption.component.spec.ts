import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SusscessfullRedemptionComponent } from './susscessfull-redemption.component';
import { HeaderModule } from '../../header/header.module';

fdescribe('SusscessfullRedemptionComponent', () => {
  let component: SusscessfullRedemptionComponent;
  let fixture: ComponentFixture<SusscessfullRedemptionComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SusscessfullRedemptionComponent
      ],
      imports: [
        RouterTestingModule,
        HeaderModule
      ],
     
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SusscessfullRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
