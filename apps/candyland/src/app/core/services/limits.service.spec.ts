import { TestBed } from '@angular/core/testing';

import { LimitsService } from './limits.service';
import { LimitsHttpsService } from '@perx/whistler-services';
import { of } from 'rxjs';

describe('LimitsService', () => {
  let service: LimitsService;
  let limitsHttpServiceSpy: { deleteLimit: jasmine.Spy, updateLimit: jasmine.Spy, createLimit: jasmine.Spy };

  beforeEach(() => {
    limitsHttpServiceSpy = jasmine.createSpyObj('LimitsHttpsService', ['deleteLimit', 'updateLimit', 'createLimit']);

    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: LimitsHttpsService, useValue: limitsHttpServiceSpy }
      ]
    })
      .compileComponents();
    service = TestBed.get(LimitsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete the limit when updating it with empty times', (done: any) => {
    limitsHttpServiceSpy.deleteLimit.and.returnValue(of(void 0));
    service.updateLimit('id42', { duration: '' }, 'survey', 2, 3)
      .subscribe(() => { done(); });

    expect(limitsHttpServiceSpy.deleteLimit.calls.count()).toEqual(1);
    expect(limitsHttpServiceSpy.deleteLimit.calls.argsFor(0)).toEqual(['survey', 'id42']);
  });

  it('should not do anything when creating a limit with empty times', (done: any) => {
    service.createLimit({ duration: '' }, 'survey', 2, 4)
      .subscribe((s) => {
        expect(s).toBeUndefined();
        done();
      });
  });

  it('should update the limit when updating it with non empty times', (done: any) => {
    limitsHttpServiceSpy.updateLimit.and.returnValue(of(void 0));
    service.updateLimit('id42', { times: 3, duration: '' }, 'survey', 2, 4)
      .subscribe(() => { done(); });

    expect(limitsHttpServiceSpy.updateLimit.calls.count()).toEqual(1);
    expect(limitsHttpServiceSpy.updateLimit.calls.argsFor(0))
      .toEqual([
        'id42',
        {
          data: {
            id: 'id42',
            type: 'limits',
            attributes: { engagement_id: 4, campaign_entity_id: 2, max_responses_per_user: 3 }
          }
        },
        'survey'
      ]);
  });

  it('should create the limit when creating a limit with non empty times', (done: any) => {
    limitsHttpServiceSpy.createLimit.and.returnValue(of(void 0));
    service.createLimit({ duration: '', times: 3 }, 'survey', 2, 4)
      .subscribe((s) => {
        expect(s).toBeUndefined();
        done();
      });

    expect(limitsHttpServiceSpy.createLimit.calls.count()).toEqual(1);
    expect(limitsHttpServiceSpy.createLimit.calls.argsFor(0)).toEqual([
      { data: { type: 'limits', attributes: { engagement_id: 4, campaign_entity_id: 2, max_responses_per_user: 3 } } },
      'survey'
    ]);
  });
});
