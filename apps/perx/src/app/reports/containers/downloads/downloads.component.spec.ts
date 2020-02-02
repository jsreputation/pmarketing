import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadsComponent } from './downloads.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';

describe('DownloadsComponent', () => {
  let component: DownloadsComponent;
  let fixture: ComponentFixture<DownloadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadsComponent],
      imports: [UnderConstructionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
