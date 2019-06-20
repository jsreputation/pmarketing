import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleComponent } from './puzzle.component';
import { PerxCoreModule, CampaignModule } from '@perx/core/dist/perx-core';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';

describe('PuzzleComponent', () => {
  let component: PuzzleComponent;
  let fixture: ComponentFixture<PuzzleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleComponent ],
      imports: [
        PerxCoreModule,
        RouterModule.forRoot([]),
        CampaignModule.forRoot({ env: environment })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
