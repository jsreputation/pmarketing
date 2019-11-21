import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandyshopSimpleComponent } from './candyshop-simple.component';
import {
  ButtonModule,
  DownloadButtonModule,
  DownloadLinkModule,
  CopyLinkModule,
  RoleLabelModule,
  StatusLabelModule,
  ImagesPreviewModule,
  CustomLineProgressModule,
  ProgressBarModule,
  VouchersProgressBarModule,
  InfoHintModule
} from '@perx/candyshop';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CandyshopSimpleComponent', () => {
  let component: CandyshopSimpleComponent;
  let fixture: ComponentFixture<CandyshopSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CandyshopSimpleComponent],
      imports: [
        ButtonModule,
        DownloadButtonModule,
        DownloadLinkModule,
        CopyLinkModule,
        RoleLabelModule,
        StatusLabelModule,
        ImagesPreviewModule,
        CustomLineProgressModule,
        ProgressBarModule,
        VouchersProgressBarModule,
        InfoHintModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandyshopSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
