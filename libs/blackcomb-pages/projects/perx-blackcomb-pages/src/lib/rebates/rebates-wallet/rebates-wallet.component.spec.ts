import { async, ComponentFixture, TestBed  } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  RebatesListComponent,
  UtilsModule,
} from '@perxtech/core';
import {MatCardModule, MatDialogModule} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { RebatesWalletComponent } from './rebates-wallet.component';
import {Router} from '@angular/router';

describe('RebatesWalletComponent', () => {
  let component: RebatesWalletComponent;
  let fixture: ComponentFixture<RebatesWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RebatesWalletComponent,
        RebatesListComponent
      ],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        TranslateModule.forRoot(),
        MatDialogModule,
        UtilsModule,
      ],
      providers: [
        { provide: Router, useValue: jest.fn()}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebatesWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
